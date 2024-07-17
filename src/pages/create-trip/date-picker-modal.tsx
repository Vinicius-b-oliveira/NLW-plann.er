import { X } from "lucide-react"
import { Button } from "../../components/button"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

interface DatePickerModalProps {
    closeDatePicker: () => void
    eventStartAndEndDates: DateRange | undefined
    setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DatePickerModal({
    closeDatePicker,
    eventStartAndEndDates,
    setEventStartAndEndDates,
}:DatePickerModalProps) {
    
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5 flex flex-col">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Selecione a data</h2>

                    <button onClick={closeDatePicker}>
                        <X className="size-5 text-zinc-400" />
                    </button>
                </div>
            </div>

            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates}/>

            <Button onClick={closeDatePicker}>Concluído</Button>
        </div>
    </div>
  )
}