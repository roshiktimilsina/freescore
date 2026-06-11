import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.database();

const footballData = {
  "matches": [
    {
      "fixture": {
        "id": 1,
        "date": "2024-12-15T15:00:00Z",
        "status": {
          "short": "NS",
          "elapsed": null
        }
      },
      "teams": {
        "home": {
          "name": "Argentina",
          "logo": "https://media.api-sports.io/football/teams/1.png"
        },
        "away": {
          "name": "France",
          "logo": "https://media.api-sports.io/football/teams/2.png"
        }
      },
      "goals": {
        "home": null,
        "away": null
      },
      "league": {
        "id": 1,
        "name": "FIFA World Cup",
        "country": "World"
      }
    }
  ],
  "timestamp": Date.now(),
  "date": new Date().toISOString().split("T")[0],
  "counts": {
    "total": 1
  }
};

export const populateFootballCache = functions.https.onRequest(async (req, res) => {
  try {
    await db.ref('football/cache').set(footballData);
    console.log("✅ Football cache populated successfully!");
    res.status(200).json({ 
      success: true, 
      message: "Football cache populated successfully!",
      data: footballData
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
});
