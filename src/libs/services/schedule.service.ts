import { Response } from "../../interfaces/Response"
import http from "../http/http"

const useScheduleService = () => {

    const getSchedules = async (id: number) => {
        try {
            const schedules = await http.get<Response<Schedule[]> | undefined>(`/schedules/${id}`)
            
            if (schedules.data) {
                return schedules.data.data
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    const getHistory = async (id: number) => {
        try {
            const schedules = await http.get<Response<Schedule[]> | undefined>(`/schedules/${id}/history`)
            
            if (schedules.data) {
                return schedules.data.data
            }
        } catch (error) {
            console.error(error)
        }
    }


    const getNearbyMaintenance = async (id: number): Promise<Schedule | undefined> => {
        try {
            const schedule = await http.get<Response<Schedule>>(`/schedules/${id}/nearby`)

            return schedule.data.data
        } catch (error) {
            console.error(error)
        }
    }

    const getDaysOff = async (year: string, monnth: string): Promise<string[] | undefined> => {
        try {
            const daysOff = await http.get<Response<string[]>>(`/schedules/days-off/${year}/${monnth}`)

            if (daysOff.data) {
                return daysOff.data.data
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getWorkshops = async (dateTime: string = ''): Promise<Workshop[] | undefined> => {
        try {
            const workshops = await http.get(`/schedules/workshops/${dateTime}`)

            if (workshops.data) {
                return workshops.data.data
            }
        } catch (error) {
            console.error(error)
        }
    }

    const reservate = async (scheduleId: number, dateTime: string, workshopId: number) => {
        try {
            const reservate = await http.put<Response<any>>(`/schedules/${scheduleId}/reservation`, {
                reservated_at: dateTime,
                workshop_id: workshopId
            })
        } catch (error) {
            console.error(error)
        }
    }

    return {
        getSchedules,
        getHistory,
        getNearbyMaintenance,
        getWorkshops,
        getDaysOff,
        reservate
    }
}

export default useScheduleService