import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { DateRange } from "react-day-picker";
import { format} from 'date-fns'

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    eventStartAndEndDates: DateRange | undefined
    closeGuestsInput: () => void
    openGuestsInput: () => void
    openDataPicker: () => void
    setDestination: (destination: string) => void
}

export function DestinationAndDateStep({
    closeGuestsInput,
    isGuestsInputOpen,
    openGuestsInput,
    setDestination,
    openDataPicker,
    eventStartAndEndDates
}: DestinationAndDateStepProps) {

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
        ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
        : null

    return(
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400 "/>
                <input
                    disabled={isGuestsInputOpen} 
                    type="text" 
                    placeholder="Para onde você vai?" 
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    onChange={event => setDestination(event.target.value)}
                />    
            </div>

            <button onClick={openDataPicker} disabled={isGuestsInputOpen}  className="flex items-center gap-2 text-left w-[240px]">
                <Calendar className="size-5 text-zinc-400 "/>
                <span className="text-lg text-zinc-400 w-40 flex-1">
                    {displayedDate || 'Quando?'}
                </span>
            </button>
    
          <div className="w-px h-6 bg-zinc-800"/>

          {isGuestsInputOpen ? (
            <Button onClick={closeGuestsInput} variant="secondary">
              Alterar Local/data
              <Settings2 className="size-5 "/>  
            </Button>
          ) : (
            <Button onClick={openGuestsInput}>
              Continuar
              <ArrowRight className="size-5" />
            </Button>
          )}
        </div>
    )
}