import http from "../http/http"
import { Response } from "../../interfaces/Response"
import { useDispatch } from "react-redux"

const useEngagementService = () => {
    
    const sendFeedback = async (message: string) => {
        try {
            const feedback = await http.post<Response<any>>('/engagement/feedback', {message})

            if (feedback.data.data) {
                return feedback
            }
        } catch (error) {
            console.error(error)
        }
    }

    
    const fetchEvents = async (): Promise<Event[] | undefined> => {
        try {
            const events = await http.get<Response<Event[]>>('/engagement/events')

            if (events.data.data) {
                return events.data.data
            }
        } catch (error) {
            console.error(error)
        }
    }

    const claimEvent = async(eventId: number): Promise<any> => {
        try {
            const events = await http.post<Response<any>>('/engagement/claim', {event_id: eventId})

            if (events.data.data) {
                return events.data.data
            }
        } catch (error) {
            console.error(error)
        }
    }


    return {
        sendFeedback,
        fetchEvents,
        claimEvent
    }
}

export default useEngagementService