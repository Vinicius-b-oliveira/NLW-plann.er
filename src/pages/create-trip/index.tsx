import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { DatePickerModal } from "./date-picker-modal";
import dayjs from "dayjs";

export function CreateTripPage() {
    const navigate = useNavigate();

    const [isGuestsInputOpen, setIsGuestsInputOpen ] = useState(false);
    const [isGuestsModalOpen, setIsGuestsModalOpen ] = useState(false);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    const [destination, setDestination] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('')
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

    const [emailsToInvite, setEmailsToInvite] = useState<Array<string>>([])

    function openGuestsInput() {
        setIsGuestsInputOpen(true);
    }

    function closeGuestsInput() {
        setIsGuestsInputOpen(false);
    }

    function openGuestsModal() {
        setIsGuestsModalOpen(true);
    }

    function closeGuestsModal() {
        setIsGuestsModalOpen(false);
    }

    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true);
    }

    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false);
    }

    function openDataPicker() {
        return setIsDatePickerOpen(true)
    }
    
    function closeDatePicker() {

        if(dayjs(eventStartAndEndDates?.from).isBefore(new Date())) {
            return alert("A data é inválida !")
        }

        if(dayjs(eventStartAndEndDates?.to).isBefore(eventStartAndEndDates?.from)) {
            return alert("A data é inválida !")
        }

        return setIsDatePickerOpen(false)
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();

        if(!email) {
            return alert("Insira um email !");
        }

        if(emailsToInvite.includes(email)) {
            return alert("Email já convidado !");
        }

        setEmailsToInvite([...emailsToInvite, email]);

        event.currentTarget.reset()
    }

    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);

        setEmailsToInvite(newEmailList);
    }

    async function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!destination) {
            return alert("Insira um destino !")
        }

        if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
            return alert("Insira uma data de inicio e fim !")
        }

        if (emailsToInvite.length === 0) {
            return alert("Convide ao menos uma pessoa !")
        }
        if (!ownerName || !ownerEmail) {
            return alert("Insira os seus dados !")
        }

        const response = await api.post("/trips", {
            destination,
            starts_at: eventStartAndEndDates.from,
            ends_at: eventStartAndEndDates.to,
            emails_to_invite: emailsToInvite,
            owner_name: ownerName,
            owner_email: ownerEmail,
        })

        const { tripId } = response.data

        navigate(`/trips/${tripId}`);
    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.svg" alt="plann.er" />

                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem !</p>
                </div>

                <div className="space-y-4">

                <DestinationAndDateStep 
                    closeGuestsInput={closeGuestsInput}
                    isGuestsInputOpen={isGuestsInputOpen}
                    openGuestsInput={openGuestsInput}
                    setDestination={setDestination}
                    openDataPicker={openDataPicker}
                    eventStartAndEndDates={eventStartAndEndDates}
                />

                {isGuestsInputOpen && (
                    <InviteGuestsStep 
                        emailsToInvite={emailsToInvite}
                        openConfirmTripModal={openConfirmTripModal}
                        openGuestsModal={openGuestsModal}
                    />
                )}

                </div>

                <p className="text-sm text-zinc-500">
                    Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a href="#" className="text-zinc-30 underline">termos de uso</a> e <a href="#" className="text-zinc-30 underline">políticas de privacidade</a>
                </p>
            </div>

            {isGuestsModalOpen && (
                <InviteGuestsModal 
                    emailsToInvite={emailsToInvite}
                    addNewEmailToInvite={addNewEmailToInvite}
                    closeGuestsModal={closeGuestsModal}
                    removeEmailFromInvites={removeEmailFromInvites}
                />
            )}

            {isConfirmTripModalOpen && (
                <ConfirmTripModal 
                    closeConfirmTripModal={closeConfirmTripModal}
                    createTrip={createTrip}
                    setOwnerName={setOwnerName}
                    setOwnerEmail={setOwnerEmail}
                />
            )}

            {isDatePickerOpen && (
                <DatePickerModal 
                    closeDatePicker={closeDatePicker}
                    eventStartAndEndDates={eventStartAndEndDates}
                    setEventStartAndEndDates={setEventStartAndEndDates}
                />
            )}

        </div>
    )
}
