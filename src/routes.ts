import express, { Router, Request, Response, NextFunction } from "express";
import { TrackController } from "./controller/TrackController";

const router: Router = express.Router();

router.get(
  "/tracks/:isrc",
  async (req: Request, res: Response, next: NextFunction) => {
    const { isrcInput } = req.params;

    try {
      const trackController = new TrackController();
      const responseData = await trackController.findTrackByIsrc(isrcInput);
      if (responseData) {
        res.status(200).json(responseData);
      } else {
        res.status(404).json({ error: "Track not found" });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/tracks/artist/:artist",
  async (req: Request, res: Response, next: NextFunction) => {
    const { artistName } = req.params;
    try {
      const trackController = new TrackController();
      const responseData = await trackController.findTrackByArtist(artistName);
      if (responseData) {
        res.status(200).json(responseData);
      } else {
        res.status(404).json({ error: "Track not found" });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "track/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const { isrc } = req.body;
    if (!isrc) {
      return res.status(400).json({ error: "ISRC parameter is required" });
    }
    try {
      const trackController = new TrackController();
      const newTrack = await trackController.saveTrack(isrc);
      res.status(201).json(newTrack);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", (req, res) => {
  res.send("Hello, this is a sample API");
});

export default router;
