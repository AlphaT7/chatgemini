export default class AudioInput {
  constructor() {
    this.keyPhrase = "computer";
    this.commandLog = [];
    this.audioTranscriptLog = [];
    this.audioTranscriptLogArchive = [];
    this.lastEntryTimestamp = Date.now();
    this.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.AudioAnalysis = new this.SpeechRecognition();
    this.speechInProgress = false;
    this.restartInProgress = false;
    this.audioListening = false;
  }

  // commands:
  //    "computer"  --> runs sends the command to the server for ai processing
  //    "current report"  --> console.log the transcript log
  //    "archive report"  --> console.log the archive
  //    "command report"  --> console.log the command sent for ai processing

  async isAcceptableTimeLapse() {
    let now = Date.now();
    let timeLapse = (now - this.lastEntryTimestamp) / 1000;
    if (timeLapse < 10) {
      console.log(`[ ${timeLapse} seconds ] Inactivity Marker...`);

      return true;
    } else {
      document.getElementById("button").style.color = "#595959";
      document.getElementById("listening").style.color = "#595959";
      document.getElementById("listening").innerHTML =
        "Press the button and start talking! =)";
      this.AudioAnalysis.abort();
      this.AudioAnalysis.stop();
      console.log(
        `Greater than [ ${timeLapse} ] seconds of inactivity. Exiting Loop...`
      );
      return false;
    }
  }

  checkTimeLapse() {
    if (this.isAcceptableTimeLapse) {
      setTimeout(() => {
        this.checkTimeLapse();
      }, 10001);
    }
  }

  getCurrentLog() {
    console.group(`Current Log Report`);
    this.audioTranscriptLog.forEach((input, i) => {
      console.log(`Current Log Entry ${i + 1} [${input[0]}]: ${input[1]}`);
    });
    console.groupEnd();
  }

  getArchiveLog() {
    this.audioTranscriptLogArchive.forEach((input, i) => {
      console.group(`Archive Log Report #${i + 1}`);
      input.forEach((str, j) => {
        console.log(`Archive Log Entry ${j + 1} [${str[0]}]: ${str[1]}`);
      });

      console.groupEnd();
    });
  }

  getCommandLog() {
    console.group(`Command Log Report`);
    this.commandLog.forEach((input, i) => {
      console.log(`Command Log Entry ${i + 1} [${input[0]}]: ${input[1]}`);
    });
    console.groupEnd();
  }

  queryAI() {
    this.audioTranscriptLogArchive[this.audioTranscriptLogArchive.length] =
      this.audioTranscriptLog.slice(0, this.audioTranscriptLog.length);

    let str = this.audioTranscriptLog.join(" ");
    let data = str.slice(str.indexOf(this.keyPhrase.toLowerCase()), str.length);

    this.commandLog.push([Date.now(), data]);

    this.audioTranscriptLog.length = 0;
  }

  async restart() {
    if (!(await this.isAcceptableTimeLapse())) return;
    if (this.restartInProgress) return;
    this.restartInProgress = true;
    setTimeout(() => {
      try {
        if (!this.speechInProgress) this.AudioAnalysis.start();
        this.restartInProgress = false;
      } catch (e) {
        console.log(`Failed to restart: ${e}`);
      }
    }, 250);
  }

  async start() {
    this.AudioAnalysis.onresult = (e) => {
      let transcript = e.results[0][0].transcript.toString().toLowerCase();
      this.audioTranscriptLog.push([Date.now(), transcript]);
      let currentLog = this.audioTranscriptLog.join("");
      this.lastEntryTimestamp = Date.now();

      if (currentLog.includes(this.keyPhrase.toLowerCase())) this.queryAI();
      if (transcript.includes("current report")) this.getCurrentLog();
      if (transcript.includes("archive report")) this.getArchiveLog();
      if (transcript.includes("command report")) this.getCommandLog();
    };

    this.AudioAnalysis.onspeechstart = (e) => {
      this.speechInProgress = true;
      // console.log("started");
    };

    this.AudioAnalysis.onspeechend = () => {
      this.speechInProgress = false;
      // console.log("ended");
      this.restart();
    };

    this.AudioAnalysis.addEventListener("start", () => {
      this.audioListening = true;
    });

    this.AudioAnalysis.addEventListener("end", () => {
      this.audioListening = false;
    });

    this.AudioAnalysis.onerror = (e) => {
      console.log(
        `${Date.now()} Recognition Error: ${e.error} : Restarting Loop...`
      );
      this.restart();
    };

    this.checkTimeLapse();
    this.AudioAnalysis.start();
  }
}
