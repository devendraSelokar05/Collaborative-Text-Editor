import { codeSession } from "../models/Codesession.model.js";

//CreateSession
const createSession = async (req, res) => {
    try {
        // Example: Create a new session
        const { code, language, theme, participants } = req.body;

        // Validate input
        if (!code || !participants || participants.length === 0) {
            return res.status(400).send({ error: "Code and participants are required" });
        }

        // Create a new CodeSession document
        const newSession = new codeSession({
            code,
            language,
            theme,
            participants,
        });

        // Save session to the database
        const savedSession = await newSession.save();

        // Respond with the saved session
        res.status(200).send(savedSession);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).send({ error: "An error occurred while creating the session" });
    }
};

//getsession
const getSession = async (req, res) => {
    try {
        // Check if `id` is provided in the request params
        if (req.params.id) {
            const session = await codeSession.findById(req.params.id);

            if (!session) {
                res.status(404).send({ message: "Session not found" });
            }

            return res.status(200).send(session);
        } else {
            // If no `id` is provided, return all sessions
            const sessions = await codeSession.find();
            return res.status(200).send(sessions);
        }
    } catch (error) {
        // console.error(error);
         res.status(500).send({ error: "Failed to fetch session(s)", details: error.message });
    }
};

//Updatesession
const updateSession = async (req, res) => {
    try {
        const { code, language, theme, participants } = req.body;

        const updateFields = {};
        if (code) updateFields.code = code;
        if (language) updateFields.language = language;
        if (theme) updateFields.theme = theme;
        if (participants) updateFields.participants = participants;

        // Find and update session by ID
        const session = await codeSession.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true } // Ensures updated session is returned
        );

        // If session is not found
        if (!session) {
            return res.status(404).send({ message: "Session not found" });
        }

        // Return success response with updated session
        return res.status(200).send({
            message: "Session Updated Successfully",
            session
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: "Failed To Update Session",
            details: error.message
        });
    }
};

const addParticipants = async (req, res) => {
    try {
      
        const session = await codeSession.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        session.participants.push({
            name: req.body.participant.name,
            role: req.body.participant.role || 'viewer' 
        });

        await session.save();
        
        res.status(200).json({ message: 'Participant added successfully', session });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add participant', details: error.message });
    }
}

export {createSession, getSession, updateSession, addParticipants};
