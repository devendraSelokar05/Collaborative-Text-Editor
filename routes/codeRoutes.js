import express from "express"
import {addParticipants, createSession,  getSession, updateSession } from "../controllers/codeControllers.js"

const router = express.Router()

router.post("/sessions", createSession)
router.get("/sessions/:id?", getSession)
router.put('/sessions/:id', updateSession)
router.patch("/sessions/:id/participants", addParticipants)


export default router