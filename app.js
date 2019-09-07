const modelParams = {
    flipHorizontal: false, // flip e.g for video 
    imageScaleFactor: 0.7, // reduce input image size for gains in speed.
    maxNumBoxes: 2, // maximum number of boxes to detect
    iouThreshold: 0.2, // ioU threshold for non-max suppression
    scoreThreshold: 0.93, // confidence threshold for predictions.
};

navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

//Select everthing from HTML

const video = document.querySelector("#video");
const audios = document.querySelector("#audio");
let model;

/*handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({
                video: {},
                stream => {
                    video.srcObject = stream;
                }
            })
            //Run detection

        }
    })
    .catch(Error => {
        console.log(Error);
    });*/
handTrack.startVideo(video).then(status => {
    if (status) {
        navigator.mediaDevices.getUserMedia({
                video: true
            })
            .then(function (stream) {
                video.srcObject = stream;
                setInterval(rundetection, 300);
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }
});

rundetection = () => {
    var audio = new Audio();
    audio.pause();
    audio.currentTime = 0.0;
    model.detect(video)
        .then(prediction => {
            if (prediction.length != 0) {
                let hand1 = prediction[0].bbox;
                let x = hand1[0];
                let y = hand1[1];
                console.log(x, y)
                /* if (y > 226) {
                     if (x >50 && x<120) {
                         audio.scr = "Drum1.mp3";
                         audio.play();
                     } else if(x>120 && x<320){
                         audio.scr = "Drum1.mp3";
                         audio.play();
                     }
                     else if (x > 320) {
                         var audio = new Audio('Drum2.mp3');
                         audio.play();
                     } else if (x > 400) {
                         var audio = new Audio('Drum3.mp3');
                         audio.play();

                     }

                 }*/
                if (y > 50 && x > 50) {
                    if (x < 150) {
                        //audios.src = "Drum5.mp3"
                        audio.pause();
                        audio.currentTime = 0.0;
                        audio = new Audio('Drum5.mp3');
                        audio.play();
                    } else if (x > 400) {
                        audio.pause();
                        audio.currentTime = 0.0;
                        audio = new Audio('Drum3.mp3');
                        audio.play();
                    } else if (x > 300) {
                        audio.pause();
                        audio.currentTime = 0.0;
                        audio = new Audio('Drum2.mp3');
                        audio.play();
                    } else if (x > 150) {
                        audio.pause();
                        audio.currentTime = 0.0;
                        audio = new Audio('Drum1.mp3');
                        audio.play();
                    }


                }
            } else {


            }

        })
}

handTrack.load(modelParams)
    .then(lmodel => {
        model = lmodel;

    })