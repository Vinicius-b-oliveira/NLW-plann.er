import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { ConfirmParticipantModal } from "./confirm-participant-modal";
import { ManageParticipantsModal } from "./manage-participants-modal";

interface Participant {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}

export function Guests() {

    const { tripId } = useParams()

    const [participants, setParticipants] = useState<Participant[]>([])
    const [isConfirmParticipantModalOpen, setIsParticipantModalOpen] = useState(false)
    const [isManageParticipantsModalOpen, setIsManageParticipantsModalOpen] = useState(false)
    const [participantId, setParticipantId] = useState('')

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`)
            .then(response => setParticipants(response.data.participants))
    }, [tripId])


    function openConfirmParticipantModal(participantId:string) {
        setParticipantId(participantId)
        setIsParticipantModalOpen(true)
    }

    function closeConfirmParticipantModal() {
        setIsParticipantModalOpen(false)
    }

    function openManageParticipantsModal() {
        setIsManageParticipantsModalOpen(true);
    }

    function closeManageParticipantsModal() {
        setIsManageParticipantsModalOpen(false);
    }

    return(
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>

            <div className="space-y-5">
                {participants.map((participant, index) => {
                    return (
                        <div key={participant.id} onClick={() => openConfirmParticipantModal(participant.id)} className="flex items-center justify-between gap-4 cursor-pointer">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                                <span className="block text-sm text-zinc-400 truncate">
                                    {participant.email}
                                </span>
                            </div>
                            {(participant).is_confirmed ? (
                                <CheckCircle2 className="text-green-400 size-5 shrink-0"/>
                            ) : (
                                <CircleDashed className="text-zinc-400 size-5 shrink-0"/>
                            )}
                        </div>
                    )
                })}
            </div>

            <Button onClick={openManageParticipantsModal} variant="secondary" size="full">
                <UserCog className="size-5 "/>  
                Gerenciar convidados
            </Button>

            {isConfirmParticipantModalOpen && (
                <ConfirmParticipantModal 
                    closeConfirmParticipantModal={closeConfirmParticipantModal}
                    participantId={participantId}
                />
            )}

            {isManageParticipantsModalOpen && (
                <ManageParticipantsModal 
                    closeManageParticipantsModal={closeManageParticipantsModal}
                />
            )}

        </div>
    )
}