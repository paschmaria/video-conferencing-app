let session = null,
    publisher = null,
    archiveID = null;

// Handling all of our errors here by alerting them
function handleError(err) {
    if (err) {
        alert(err.message);
    }
}
    
function initializeSession(apiKey, sessionId, token, name) {
    // initialize session object
    session = OT.initSession(apiKey, sessionId);
    publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        facingMode: 'user', // environment: for back-facing camera
        name: name,
    }, function(err) {
        if (err) {
            switch (err.name) {
                case "OT_NOT_CONNECTED":
                    alert("Publishing your video failed. You are not connected to the internet.");
                break;
                default:
                    alert("An unknown error occurred while trying to publish your video. Please try again later.");
          }
          publisher.destroy();
          publisher = null;
        }
    });

    session.on({
        sessionConnected: function(event) {
            // Publish the publisher (this creates a stream other clients can connect to).
            session.publish(publisher, handleError);
          },
        // Subscribe to a other created streams.
        streamCreated: function(event) {
            let subContainer = document.createElement('div');
            subContainer.id = 'stream-' + event.stream.streamId;
            subContainer.classList.add("card");
            document.getElementById('subscribers').appendChild(subContainer);

            session.subscribe(event.stream, subContainer, {
                insertMode: 'append',
                width: '100%',
                height: '100%',
                facingMode: 'user'
            }, handleError);

        },
        streamDestroyed: function (event) {
            // when a stream other than yours leaves a session.
            console.log("Stream stopped. Reason: " + event.reason);
        },
        // when a new client connects to the session
        connectionCreated: function (event) {
            if (event.connection.connectionId != session.connection.connectionId) {
                alert('A new user just joined this meeting.');
            }
        },
        // when a client leaves the session
        connectionDestroyed: function connectionDestroyedHandler(event) {
            alert('A user just left');
        },
        // If your session disconnects
        sessionDisconnected: function(event) {
            console.log('Disconnected from the session.');
            document.getElementById('disconnectBtn').style.display = 'none';
            if (event.reason == "networkDisconnected") {
                alert("Your network connection terminated.")
            }
        }
    });


    // Connect to the session
    session.connect(token, function(error) {
        // If the connection is successful, publish to the session
        if (error) {
            handleError(error);
        } else {
            document.getElementById('disconnectBtn').style.display = 'block';
            publisher.on({
                streamCreated: function (event) {
                    // when your publisher creates a stream
                    console.log('The publisher started streaming.');
                },
                streamDestroyed: function (event) {
                    event.preventDefault();
                    if (event.reason === 'networkDisconnected') {
                        alert('Your publisher lost its connection. Please check your internet connection and try again.');
                    }
                }
            });
        }
    });

    $('.btn-session-end').on('click', function (e) {
        session.disconnect();
    })
}