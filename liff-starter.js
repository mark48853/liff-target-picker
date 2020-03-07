window.onload = function (e) {
  liff.init(function (data) {
      initializeApp(data);
      tday = new Date()
      cday = tday.getDay()
      console.log(cday)
      liff.sendMessages([{
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "bubble",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": cday,
          "align": "center"
        }
      ]
    },
    "hero": {
      "type": "image",
      "url": "https://developers.line.biz/assets/images/services/bot-designer-icon.png",
      "size": "full",
      "aspectRatio": "1.51:1",
      "aspectMode": "fit"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Body",
          "align": "center"
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "Button",
            "uri": "https://linecorp.com"
          }
        }
      ]
    }
  }
}])
//     liff.login()
//     liff.shareTargetPicker([{
//       type: 'text',
//       text: "yaranaika"
//   }]).catch(function (error) {
//     window.alert("Error sending message: " + error);
// });
  })}

function initializeApp(data) {
  document.getElementById('languagefield').textContent = data.language;
  document.getElementById('viewtypefield').textContent = data.context.viewType;
  document.getElementById('useridfield').textContent = data.context.userId;
  document.getElementById('utouidfield').textContent = data.context.utouId;
  document.getElementById('roomidfield').textContent = data.context.roomId;
  document.getElementById('groupidfield').textContent = data.context.groupId;

  // openWindow call
  document.getElementById('openwindowbutton').addEventListener('click', function () {
      liff.openWindow({
          url: 'https://line.me'
      });
  });

  // closeWindow call
  document.getElementById('closewindowbutton').addEventListener('click', function () {
      liff.closeWindow();
  });

  // sendMessages call
  document.getElementById('sendmessagebutton').addEventListener('click', function () {
      liff.sendMessages([{
          type: 'text',
          text: "You've successfully sent a message! Hooray!"
      }, {
          type: 'sticker',
          packageId: '2',
          stickerId: '144'
      }]).then(function () {
          window.alert("Message sent");
      }).catch(function (error) {
          window.alert("Error sending message: " + error);
      });
  });

  // get access token
  document.getElementById('getaccesstoken').addEventListener('click', function () {
      const accessToken = liff.getAccessToken();
      document.getElementById('accesstokenfield').textContent = accessToken;
      toggleAccessToken();
  });

  // get profile call
  document.getElementById('getprofilebutton').addEventListener('click', function () {
      liff.getProfile().then(function (profile) {
          document.getElementById('useridprofilefield').textContent = profile.userId;
          document.getElementById('displaynamefield').textContent = profile.displayName;

          const profilePictureDiv = document.getElementById('profilepicturediv');
          if (profilePictureDiv.firstElementChild) {
              profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
          }
          const img = document.createElement('img');
          img.src = profile.pictureUrl;
          img.alt = "Profile Picture";
          profilePictureDiv.appendChild(img);

          document.getElementById('statusmessagefield').textContent = profile.statusMessage;
          toggleProfileData();
      }).catch(function (error) {
          window.alert("Error getting profile: " + error);
      });
  });
}

function toggleAccessToken() {
  toggleElement('accesstokendata');
}

function toggleProfileData() {
  toggleElement('profileinfo');
}

function toggleElement(elementId) {
  const elem = document.getElementById(elementId);
  if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
      elem.style.display = "none";
  } else {
      elem.style.display = "block";
  }
}