import { AtSign, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface ManageParticipantsModalProps {
    closeManageParticipantsModal: () => void
}

export function ManageParticipantsModal({
    closeManageParticipantsModal,
}:ManageParticipantsModalProps) {

    const { tripId } = useParams()

    async function verifyParticipant(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const email = data.get('email')?.toString()

        if(!email) {
            return alert("Insira um email !")
        }

        await api.post(`/trips/${tripId}/invites`, {
            email
        })

        location.reload()
    }

    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">

                        <h2 className="text-lg font-semibold">Gerenciar Convidados</h2>

                        <button onClick={closeManageParticipantsModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>

                    </div>

                    <p className="text-sm text-zinc-400">
                        Obs: Os convidados são confirmados via email(ethereal), contudo só é possível acessar esses emails através do console onde está rodando o backend
                    </p> 
                
                </div>

                <form onSubmit={verifyParticipant} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <AtSign className="text-zinc-400 size-5"/>
                        <input 
                        name="email"
                        placeholder="Insira o email do convidado" 
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        /> 
                    </div>

                    <Button type="submit" size="full">
                        Adicionar participante
                    </Button>
                </form>
            </div>
        </div>
    )
}