//render function for Name start here //

var socket = io();
var ownId;
var receiverId;
var recieverName;
var reciverImage;
var messages = [];
var imageUrl;
var notify = [];
var activeDiv;
var user = {};
var numbers = /^[-+]?[0-9]+$/;

makeTemplates();


// avataar container start here

bind('.mainContainer .loginSection .userInfo .userProfileImg', function() {
    $('.realBoxSection').fadeOut('slow');
    $('.avatarContainer').fadeIn('slow');
})
bind('.avatar', function() {
    $('.realBoxSection').show();
    user.imageUrl = $(this).attr('src');
    console.log('image url    ', user.imageUrl)
    $('.userInfo .userProfileImg').html('<img src="' + user.imageUrl + '" class="userImage">');
    $('.avatarContainer').fadeOut('slow');

})

// avataar container closed here




//multiple screens render start here

function update(req) {
    localUser = req;
}


var loginScreen1 = new function() {
    this.show = function() {
        render('.screens', 'screen1', user, function() {
            bind('.mainContainer .loginSection .userInfo .name .screen .enterButton .nextScreen', function() {
                var localUser = JSON.parse(JSON.stringify(user));
                localUser.userName = $('.name .screen .textBox .inputBox').val();
                if (localUser.userName == '') {
                    alert("Please enter your name");
                }
                if (user.imageUrl == '') {
                    alert("Please select profile image");
                } else {
                    var temp = {};
                    temp.next = 'loginScreen2';
                    temp.user = localUser;
                    update(temp);
                }
                console.log("loginScreen1");
            })
        })
    }
}

loginScreen1.show(user);

var loginScreen2 = new function() {
    this.show = function(req) {
        render('.screens', 'screen2', req, function() {
            bind('.mainContainer .loginSection .userInfo .age .screen .enterButton .nextScreen', function() {
                var localUser = JSON.parse(JSON.stringify(req));
                localUser.userAge = $('.age .screen .textBox .inputBox').val();
                if (localUser.userAge == '') {
                    alert("Please enter your Age");
                } else {
                    var temp = {};
                    temp.next = 'loginScreen3';
                    temp.user = localUser;
                    update(temp);
                }
                console.log(localUser.userAge);
            })
            bind('.mainContainer .loginSection .userInfo .screen .enterButton .previousScreen', function() {
                req.next = 'loginScreen1';
                loginScreen1.show(user);
            })

        })
    }
}

var loginScreen3 = new function() {
    this.show = function(req) {
        render('.screens', 'screen3', req, function() {
            console.log("hello render function", req);
            bind('.mainContainer .loginSection .userInfo .school .screen .enterButton .nextScreen', function() {
                var localUser = JSON.parse(JSON.stringify(req));
                localUser.userSchool = $('.school .screen .textBox .inputBox').val();
                if (localUser.userSchool == '') {
                    alert("Please enter your school name");
                } else {
                    var temp = {};
                    temp.next = 'loginScreen4';
                    temp.user = localUser;
                    update(temp);

                }
                console.log(localUser.userSchool);
            })
            bind('.mainContainer .loginSection .userInfo .screen .enterButton .previousScreen', function() {
                req.next = 'loginScreen2';
                loginScreen2.show(user);
            })

        })
    }
}

var loginScreen4 = new function() {
    this.show = function(req) {
        render('.screens', 'screen4', req, function() {
            bind('.mainContainer .loginSection .userInfo .city .screen .enterButton .nextScreen', function() {
                var localUser = JSON.parse(JSON.stringify(req));
                localUser.userCity = $('.city .screen .textBox .inputBox').val();
                if (localUser.userCity == '') {
                    alert("Please enter your city");
                } else {
                    var temp = {};
                    temp.next = 'finishScreen';
                    temp.user = localUser;
                    update(temp);

                }
                console.log(localUser.userCity);
                render('.detailsContainer', 'details', user, function() {
                    bind('.info .infoEditInner.name .infoEditButton.name', function() {
                        $('.infoEditInner.name').hide();
                        $('.infoUpdateInner.name').show();
                    })
                    bind('.info .infoUpdateInner.name .infoUpdateButton.name', function() {
                        $('.infoUpdateInner.name').hide();
                        $('.infoEditInner.name').show();
                        userNameUpdate = $('.mainContainer .detailsContainer .details .info .infoUpdateInner .infoUpdateData .inputUpdate.name').val();
                        if (userNameUpdate == '') {

                        } else {
                            user.userName = userNameUpdate;
                            $('.mainContainer .detailsContainer .details .info .infoEditInner .infoData.name').empty();
                            $('.mainContainer .detailsContainer .details .info .infoEditInner .infoData.name').append(user.userName);
                        }

                    })


                    bind('.info .infoEditInner.age .infoEditButton.age', function() {
                        $('.infoEditInner.age').hide();
                        $('.infoUpdateInner.age').show();
                    })
                    bind('.info .infoUpdateInner.age .infoUpdateButton.age', function() {
                        $('.infoUpdateInner.age').hide();
                        $('.infoEditInner.age').show();
                        userAgeUpdate = $('.mainContainer .detailsContainer .details .info .infoUpdateInner .infoUpdateData .inputUpdate.age').val();
                        if (userAgeUpdate == '') {

                        } else {
                            user.userAge = userAgeUpdate;
                            $('.mainContainer .detailsContainer .details .info .infoEditInner .infoData.age').empty();
                            $('.mainContainer .detailsContainer .details .info .infoEditInner .infoData.age').append(user.userAge);
                        }
                    })


                    bind('.info .infoEditInner.school .infoEditButton.school', function() {
                        $('.infoEditInner.school').hide();
                        $('.infoUpdateInner.school').show();
                    })
                    bind('.info .infoUpdateInner.school .infoUpdateButton.school', function() {
                        $('.infoUpdateInner.school').hide();
                        $('.infoEditInner.school').show();
                        userSchoolUpdate = $('.mainContainer .detailsContainer .details .info .infoUpdateInner .infoUpdateData .inputUpdate.school').val();
                        if (userSchoolUpdate == '') {

                        } else {
                            user.userSchool = userSchoolUpdate;
                            $('.mainContainer .detailsContainer .details .info .infoEditInner .infoData.school').empty();
                            $('.mainContainer .detailsContainer .details .info .infoEditInner .infoData.school').append(user.userSchool);
                        }
                    })


                    bind('.info .infoEditInner.city .infoEditButton.city', function() {
                        $('.infoEditInner.city').hide();
                        $('.infoUpdateInner.city').show();
                    })
                    bind('.info .infoUpdateInner.city .infoUpdateButton.city', function() {
                        $('.infoUpdateInner.city').hide();
                        $('.infoEditInner.city').show();
                        userCityUpdate = $('.mainContainer .detailsContainer .details .info .infoUpdateInner .infoUpdateData .inputUpdate.city').val();
                        if (userCityUpdate == '') {

                        } else {
                            user.userCity = userCityUpdate
                            $('.mainContainer .detailsContainer .details .info .infoEditInner .infoData.city').empty();
                            $('.mainContainer .detailsContainer .details .info .infoEditInner .infoData.city').append(user.userCity);
                        }
                    })
                });
            })
            bind('.mainContainer .loginSection .userInfo .screen .enterButton .previousScreen', function() {
                req.next = 'loginScreen3';
                loginScreen3.show(user);
            })

        })
    }
}

var finishScreen = new function() {
    this.show = function(req) {
        render('.screens', 'finishContainer', req, function() {
            bind('.mainContainer .loginSection .userInfo .finish .screen .enterButton', function() {
                var localUser = JSON.parse(JSON.stringify(req));
                console.log("finish screen");
                var temp = {};
                temp.next = 'loginScreen4';
                temp.user = localUser;
                update(temp);
                socket.emit('user name', user);
                $('.mainContainer').hide();
                $('.chatContainer').show();
                render('.profileInfo', 'profileData', user);
            })
        })
    }
}

function update(req) {
    user = req.user;
    console.log(req.next)
    switch (req.next) {
        case 'loginScreen1':
            loginScreen1.show(user);
            break;
        case 'loginScreen2':
            loginScreen2.show(user);
            break;
        case 'loginScreen3':
            loginScreen3.show(user);
            break;
        case 'loginScreen4':
            loginScreen4.show(user);
            break;
        case 'finishScreen':
            finishScreen.show(user);
            break;
    }
}

//multiple screens render closed here



//profileInfo details show&hide function start here

$(document).ready(function() {
    $('.profileInfo').click(function() {
        $('.usersOnline').hide(500);
    });
    $('.profileHeader').click(function() {
        $('.profileInfoFull').show(500);
    });
    $('.profileHeader .backButton').click(function() {
        $('.usersOnline').show(500);

        $('.profileInfoFull').hide(500);
    });

})

//profileInfo details show&hide function closed here



//searchBox function start here

$(document).ready(function() {

    var search = $("#searchString");
    var items = $(".user");

    $("#search").on("click", function() {

        var value = search.val().toLowerCase();
        if (value == "") {
            items.show();
            return;
        }
        $.each(items, function() {
            var it = $(this);
            var string = it.find(".Name").text().toLowerCase();
            console.log(string + " --- " + value);
            if (string.indexOf(value) == 0)
                it.hide();
        });
    });
});


//searchBox function end here



// hide and show profilefullInfo start here

bind('.chatContainer .leftPanel .usersOnline .profileInfo', function() {
    $('.usersOnline').hide(500);
    $('.profileInfoFull').show(500);
    render('.profileInfoFull', 'profileInfoFull', user, function() {
        bind('.leftPanel .profileInfoFull .profileHeader .backButton', function() {
            $('.profileInfoFull').hide(500);
            $('.usersOnline').show(500);
        })
    })
})

// hide and show profilefullInfo start here




//connected onlineUsers start here

socket.on('connectedUsers', function(onlineUsers) {
    var i = 0;

    while (i < onlineUsers.length) {
        if (onlineUsers[i].profileId == socket.id) {
            ownId = onlineUsers[i].profileId;
            break;
        }
        i++;
    }
    onlineUsers.splice(i, 1);
    if (notify.length == 0) {
        notify = onlineUsers;
    } else {
        if (onlineUsers.length > notify.length) {
            var temp = 0;
            notify.push({
                profileName: onlineUsers[onlineUsers.length - 1].profileName,
                profileId: onlineUsers[onlineUsers.length - 1].profileId,
                profileImage: onlineUsers[onlineUsers.length - 1].profileImage,
                counter: temp
            })
        } else {
            var temp = [];
            for (var i = 0; i < onlineUsers.length; i++) {
                if (onlineUsers[i].profileId == notify[i].profileId) {
                    temp.push({
                        profileName: notify[i].profileName,
                        profileId: onlineUsers[i].profileId,
                        counter: notify[i].counter
                    })
                }
            }
            notify = temp;
        }
    }
    render('.usersContainer', 'user', onlineUsers);
});
//connected onlineUsers closed here


//show chatPanel start here

function showchatPanel(data) {
    console.log("Socket Id of current User: " + socket.id);

    receiverId = data.getAttribute("data-id");
    recieverName = data.getAttribute("name");
    reciverImage = data.getAttribute("profileImage");
    activeDiv = receiverId;
    var senderID = socket.id;
    console.log('reciver ID ' + receiverId);
    console.log('reciver Name ' + recieverName);

    $('.chatContainer .chatPanel .userInfo2 .userName').empty();
    $('.userInfo2').show();
    $('.chatBoxWindow').show();
    $('.messageBox').show();
    $(".chatContainer .chatPanel .userInfo2 .userName").text(recieverName);
    $('.usersContainer .user .' + receiverId).hide();

    for (var i = 0; i < notify.length; i++) {
        if (notify[i].profileId == receiverId) {
            notify[i].counter = 0;
        }
    }
    showChats(receiverId);
};

// show chatPanel closed here


//message send start from here

bind('.chatPanel .messageBox .sendButton', function() {
    var messageText = $('.chatContainer .chatPanel .messageBox .textBox .textArea').val();

    socket.emit('chatting', messageText, user, receiverId);
    $('.chatContainer .chatPanel .messageBox .textBox .textArea').val('');
});


$('.chatPanel .messageBox .textBox .textArea').keyup(function(e) {
    if (e.keyCode == 13) {
        var messageText = $('.chatContainer .chatPanel .messageBox .textBox .textArea').val();
        socket.emit('chatting', messageText, userName, receiverId);
        $('.chatContainer .chatPanel .messageBox .textBox .textArea').val('');
    }
});


//message send closed here

//sender peer message start here
socket.on('senderPeer', function(message, from, to) {
    messages.push({
        message: message,
        from: from,
        to: to
    })
    showChats(receiverId);
});

//sender peer message closed here


//reciver peer message start here

socket.on('reciverPeer', function(message, from, to) {
    console.log(message);
    messages.push({
        message: message,
        from: from,
        to: to
    })
    if (activeDiv != from) {
        for (var i = 0; i < notify.length; i++) {
            if (notify[i].profileId == from) {
                notify[i].counter = notify[i].counter + 1;
                $('.usersContainer .user .notification .' + from).show();
                $('.usersContainer .user .notification .' + from).empty();
                $('.usersContainer .user .notification .' + from).text(notify[i].counter);
                console.log(notify[i].counter);
            }
        }
    }
    showChats(receiverId);
    recieverId = from;
});

//reciver peer message closed here

// function show chats start here
function showChats(data) {
    var newMessages = [];
    for (var i = 0; i < messages.length; i++) {
        if ((messages[i].from == ownId && messages[i].to == data) || (messages[i].from == data && messages[i].to == ownId)) {
            if (messages[i].from == ownId && messages[i].to == data) {
                newMessages.push({
                    message: messages[i].message,
                    from: messages[i].from,
                    to: messages[i].to,
                    show: 'senderContainer'
                })
            } else {
                newMessages.push({
                    message: messages[i].message,
                    from: messages[i].from,
                    to: messages[i].to,
                    show: 'reciverContainer'
                })
            }
        }
    }
    console.log(newMessages);

    render('.chatBoxWindow', 'message', newMessages);
}
// function show chats closed here