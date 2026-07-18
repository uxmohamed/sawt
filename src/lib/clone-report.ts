/** Per-sound clone fidelity vs the reference recordings, from the analysis pipeline. */

export interface CloneMetrics {
  /** % of the reference's acoustic events reproduced */
  events: number;
  /** median pitch error, % */
  pitch: number;
  /** loudness error, % */
  level: number;
  /** envelope-shape correlation, -1..1 */
  envcor: number;
  /** overall clone score, 0-100 */
  score: number;
}

export const CLONE_REPORT: Record<string, CloneMetrics> = {
  "honk-gems-receive": {
    "events": 83,
    "pitch": 0.4,
    "level": 70,
    "envcor": 0.9,
    "score": 77.6
  },
  "nav-chat-a-2": {
    "events": 50,
    "pitch": 0.0,
    "level": 9,
    "envcor": 0.97,
    "score": 80.1
  },
  "they-screenshot": {
    "events": 83,
    "pitch": 4.9,
    "level": 15,
    "envcor": 0.84,
    "score": 81.9
  },
  "friend-request-button-decline": {
    "events": 100,
    "pitch": 10.7,
    "level": 11,
    "envcor": 0.91,
    "score": 82.7
  },
  "honk-tada": {
    "events": 82,
    "pitch": 0.5,
    "level": 16,
    "envcor": 0.68,
    "score": 83.4
  },
  "honk-realtime-audio-question-c": {
    "events": 100,
    "pitch": 4.8,
    "level": 15,
    "envcor": 0.68,
    "score": 84.6
  },
  "toggle-a": {
    "events": 100,
    "pitch": 3.3,
    "level": 25,
    "envcor": 0.94,
    "score": 89.7
  },
  "change-theme": {
    "events": 100,
    "pitch": 4.3,
    "level": 2,
    "envcor": 0.78,
    "score": 89.9
  },
  "honk-gems-misc-3": {
    "events": 94,
    "pitch": 1.1,
    "level": 2,
    "envcor": 0.69,
    "score": 90.0
  },
  "they-clear": {
    "events": 100,
    "pitch": 2.4,
    "level": 30,
    "envcor": 0.95,
    "score": 90.0
  },
  "nav-chat-b": {
    "events": 100,
    "pitch": 0.2,
    "level": 33,
    "envcor": 0.87,
    "score": 90.5
  },
  "they-type-space": {
    "events": 100,
    "pitch": 1.3,
    "level": 23,
    "envcor": 0.84,
    "score": 90.6
  },
  "honk-gems-use": {
    "events": 88,
    "pitch": 0.1,
    "level": 9,
    "envcor": 0.85,
    "score": 90.8
  },
  "typing-indicator": {
    "events": 100,
    "pitch": 1.0,
    "level": 23,
    "envcor": 0.86,
    "score": 91.2
  },
  "toggle-b": {
    "events": 100,
    "pitch": 1.6,
    "level": 21,
    "envcor": 0.9,
    "score": 91.9
  },
  "compliments-receive": {
    "events": 83,
    "pitch": 0.1,
    "level": 1,
    "envcor": 0.94,
    "score": 92.8
  },
  "they-type": {
    "events": 100,
    "pitch": 0.0,
    "level": 30,
    "envcor": 0.94,
    "score": 92.9
  },
  "honk-gems-misc-2": {
    "events": 86,
    "pitch": 0.3,
    "level": 3,
    "envcor": 0.95,
    "score": 92.9
  },
  "chat-presence-a": {
    "events": 100,
    "pitch": 0.5,
    "level": 23,
    "envcor": 0.93,
    "score": 93.3
  },
  "block-a": {
    "events": 100,
    "pitch": 1.6,
    "level": 17,
    "envcor": 0.94,
    "score": 93.5
  },
  "honk-game-win": {
    "events": 100,
    "pitch": 1.4,
    "level": 3,
    "envcor": 0.83,
    "score": 94.1
  },
  "honk-gems-claim": {
    "events": 100,
    "pitch": 0.4,
    "level": 9,
    "envcor": 0.84,
    "score": 94.4
  },
  "toggle-minor-a": {
    "events": 100,
    "pitch": 0.2,
    "level": 24,
    "envcor": 1.0,
    "score": 94.9
  },
  "lets-talk-call-start": {
    "events": 100,
    "pitch": 0.3,
    "level": 3,
    "envcor": 0.82,
    "score": 95.4
  },
  "search-a": {
    "events": 100,
    "pitch": 0.5,
    "level": 17,
    "envcor": 0.98,
    "score": 95.6
  },
  "report": {
    "events": 100,
    "pitch": 0.7,
    "level": 1,
    "envcor": 0.84,
    "score": 95.8
  },
  "nav-add-friends-b": {
    "events": 100,
    "pitch": 0.7,
    "level": 13,
    "envcor": 0.97,
    "score": 95.9
  },
  "chat-presence-b": {
    "events": 100,
    "pitch": 0.1,
    "level": 13,
    "envcor": 0.96,
    "score": 96.5
  },
  "honk-gems-misc-1": {
    "events": 100,
    "pitch": 0.0,
    "level": 0,
    "envcor": 0.84,
    "score": 96.7
  },
  "lets-talk-call-end": {
    "events": 100,
    "pitch": 0.1,
    "level": 4,
    "envcor": 0.89,
    "score": 96.9
  },
  "nav-minor-b": {
    "events": 100,
    "pitch": 0.0,
    "level": 9,
    "envcor": 0.94,
    "score": 97.0
  },
  "ui-error": {
    "events": 100,
    "pitch": 0.7,
    "level": 0,
    "envcor": 0.9,
    "score": 97.0
  },
  "lets-talk-push-notification": {
    "events": 100,
    "pitch": 0.1,
    "level": 12,
    "envcor": 0.98,
    "score": 97.1
  },
  "friend-request-button-accept": {
    "events": 100,
    "pitch": 0.0,
    "level": 5,
    "envcor": 0.92,
    "score": 97.3
  },
  "honk-status": {
    "events": 100,
    "pitch": 0.1,
    "level": 11,
    "envcor": 0.99,
    "score": 97.5
  },
  "honk-video-watch-notification": {
    "events": 100,
    "pitch": 0.1,
    "level": 4,
    "envcor": 0.92,
    "score": 97.5
  },
  "typing-push-notification": {
    "events": 100,
    "pitch": 0.3,
    "level": 4,
    "envcor": 0.94,
    "score": 97.6
  },
  "friend-request-button-request": {
    "events": 100,
    "pitch": 0.6,
    "level": 4,
    "envcor": 0.96,
    "score": 97.6
  },
  "honk-video-send-notification": {
    "events": 100,
    "pitch": 0.4,
    "level": 0,
    "envcor": 0.9,
    "score": 97.6
  },
  "photo-push-notification": {
    "events": 100,
    "pitch": 0.0,
    "level": 9,
    "envcor": 0.98,
    "score": 97.6
  },
  "nav-add-friends-a": {
    "events": 100,
    "pitch": 0.0,
    "level": 8,
    "envcor": 0.97,
    "score": 97.7
  },
  "nav-minor-a": {
    "events": 100,
    "pitch": 0.0,
    "level": 9,
    "envcor": 0.98,
    "score": 97.8
  },
  "compliments-send": {
    "events": 100,
    "pitch": 0.4,
    "level": 0,
    "envcor": 0.93,
    "score": 98.1
  },
  "friend-request-notification-accept": {
    "events": 100,
    "pitch": 0.2,
    "level": 5,
    "envcor": 0.96,
    "score": 98.1
  },
  "ui-confirmation": {
    "events": 100,
    "pitch": 0.2,
    "level": 3,
    "envcor": 0.96,
    "score": 98.5
  },
  "ui-general-click": {
    "events": 100,
    "pitch": 0.0,
    "level": 6,
    "envcor": 0.98,
    "score": 98.5
  },
  "they-play-audio-message": {
    "events": 100,
    "pitch": 0.3,
    "level": 0,
    "envcor": 0.95,
    "score": 98.7
  },
  "they-record-audio-message": {
    "events": 100,
    "pitch": 0.3,
    "level": 0,
    "envcor": 0.95,
    "score": 98.7
  },
  "honk-video-start-notification": {
    "events": 100,
    "pitch": 0.1,
    "level": 0,
    "envcor": 0.94,
    "score": 98.7
  },
  "lets-talk-outgoing-request": {
    "events": 100,
    "pitch": 0.2,
    "level": 3,
    "envcor": 0.99,
    "score": 98.8
  },
  "friend-request-notification-request": {
    "events": 100,
    "pitch": 0.0,
    "level": 3,
    "envcor": 0.98,
    "score": 98.8
  },
  "toggle-minor-b": {
    "events": 100,
    "pitch": 0.2,
    "level": 1,
    "envcor": 0.99,
    "score": 99.2
  },
  "honk-game-lose": {
    "events": 100,
    "pitch": 0.0,
    "level": 0,
    "envcor": 0.97,
    "score": 99.3
  },
  "alert-a": {
    "events": 100,
    "pitch": 0.0,
    "level": 0,
    "envcor": 0.99,
    "score": 99.8
  }
};

export const MEAN_SCORE = 94.1;
