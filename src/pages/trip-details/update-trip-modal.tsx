import { MapPin, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { DateRange, DayPicker } from "react-day-picker";

interface UpdateTripModalProps {
    closeUpdateTripModal: () => void
    updatedEventStartAndEndDates: DateRange | undefined
    setUpdatedEventStartAndEndDates: (dates: DateRange | undefined) => void
}
export function UpdateTripModal({
    closeUpdateTripModal,
    updatedEventStartAndEndDates,
    setUpdatedEventStartAndEndDates
}:UpdateTripModalProps) {
    const { tripId } = useParams()

    async function updateTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        
        const destination = data.get('destination')?.toString()

        if (!destination) {
            return alert("Insira um novo destino !")
        }

        if (!updatedEventStartAndEndDates?.from || !updatedEventStartAndEndDates?.to) {
            return alert("Insira uma data de inicio e fim !")
        }

        await api.put(`/trips/${tripId}`, {
            destination,
            starts_at: updatedEventStartAndEndDates.from,
            ends_at: updatedEventStartAndEndDates.to,
        })

        location.reload()
    }

    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-8">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">

                        <h2 className="text-lg font-semibold">Atualizar informações</h2>

                        <button onClick={closeUpdateTripModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>

                    </div>                
                </div>

                <form onSubmit={updateTrip} className="space-y-5 flex flex-col items-center">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <MapPin className="text-zinc-400 size-5"/>
                        <input 
                        name="destination"
                        placeholder="Atualize o destino" 
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        /> 
                    </div>

                    <DayPicker mode="range" selected={updatedEventStartAndEndDates} onSelect={setUpdatedEventStartAndEndDates}/>
                    
                    <Button type="submit" size="full">
                        Alterar 
                    </Button>
                </form>
            </div>
        </div>
    )
}