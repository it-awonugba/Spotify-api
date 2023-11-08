import express, { Router, Request, Response, NextFunction } from "express";
import { TrackController } from "./controller/TrackController";

const router = express.Router();

// Define your routes using the router object

router.post(
  "/create-track",
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
      res.status(403).json(error.message);
    }
  }
);

export default router;
/*
export const Routes = [
  {
    method: "get",
    route: "/tracks",
    controller: TrackController,
    action: "getAllTracks",
  },
  {
    method: "getTrackByIsrc",
    route: "/users/:id",
    controller: TrackController,
    action: "one",
  },
  {
    method: "post",
    route: "/track",
    controller: TrackController,
    action: "saveTrack",
  },
];
*/
