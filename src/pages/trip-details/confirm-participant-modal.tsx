import { X } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { FormEvent } from "react";

interface ConfirmParticipantModalProps {
    closeConfirmParticipantModal: () => void
    participantId: string
}

export function ConfirmParticipantModal({
    closeConfirmParticipantModal,
    participantId
}:ConfirmParticipantModalProps) {

    function confirmParticipant(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        api.get(`/participants/${participantId}/confirm`)

        location.reload()
    }
    
    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">

                        <h2 className="text-lg font-semibold">Gerenciar Convidados</h2>

                        <button onClick={closeConfirmParticipantModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>

                    </div>

                    <p className="text-sm text-zinc-400">
                        Obs: aqui você pode confirmar manualmente cada participante (alternativa ao envio de emails)
                    </p> 
                
                </div>

                <form onSubmit={confirmParticipant} className="space-y-3">
                    
                    <p>Deseja confirmar o participante na viagem ?</p>

                    <Button type="submit" size="full">
                        Confirmar participante
                    </Button>
                </form>
            </div>
        </div>
    )
}