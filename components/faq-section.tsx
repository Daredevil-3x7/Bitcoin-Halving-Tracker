"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12" id="faq">
      <h2 className="text-2xl md:text-3xl font-mono font-bold mb-8 text-center tracking-tight">
        FREQUENTLY ASKED QUESTIONS
      </h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border border-white/10 bg-white/5 rounded-sm px-4">
          <AccordionTrigger className="font-mono text-left hover:text-primary hover:no-underline">
            Is Bittensor a blockchain or an AI platform?
          </AccordionTrigger>
          <AccordionContent className="font-mono text-muted-foreground leading-relaxed">
            Bittensor is a mining network, similar to Bitcoin, that includes built-in incentives designed to encourage
            computers to provide access to machine learning models in a decentralized manner. It functions as a market
            where intelligence is priced by other intelligence systems peer-to-peer.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border border-white/10 bg-white/5 rounded-sm px-4">
          <AccordionTrigger className="font-mono text-left hover:text-primary hover:no-underline">
            What is a Subnet?
          </AccordionTrigger>
          <AccordionContent className="font-mono text-muted-foreground leading-relaxed">
            Subnets (sub-networks) are self-contained economic markets within the Bittensor network. Each subnet defines
            its own specific task (e.g., image generation, text summarization) and incentive mechanism. Miners compete
            within these subnets to produce the best outputs and earn TAO.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border border-white/10 bg-white/5 rounded-sm px-4">
          <AccordionTrigger className="font-mono text-left hover:text-primary hover:no-underline">
            How does the Halving affect miners?
          </AccordionTrigger>
          <AccordionContent className="font-mono text-muted-foreground leading-relaxed">
            The halving reduces both TAO and Alpha token emissions by 50%. This means rewards distributed to miners and
            validators are cut in half. Subnets launched before a halving benefit from periods of faster liquidity
            growth, while later subnets face slower growth due to the reduced emission rate. Historically, supply
            reductions can lead to increased competition and efficiency among participants.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border border-white/10 bg-white/5 rounded-sm px-4">
          <AccordionTrigger className="font-mono text-left hover:text-primary hover:no-underline">
            What is the Yuma Consensus?
          </AccordionTrigger>
          <AccordionContent className="font-mono text-muted-foreground leading-relaxed">
            Yuma Consensus is Bittensor's algorithm that resolves validator rankings of miner performances into emission
            vectors for both miners and validators. It ensures fair reward distribution by weighting validator
            assessments based on their stake and trust scores, preventing manipulation and rewarding accurate
            evaluations of network contributions.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border border-white/10 bg-white/5 rounded-sm px-4">
          <AccordionTrigger className="font-mono text-left hover:text-primary hover:no-underline">
            Where can I buy TAO?
          </AccordionTrigger>
          <AccordionContent className="font-mono text-muted-foreground leading-relaxed">
            TAO is available on various exchanges. Always verify you are using official links and supported platforms.
            Check sites like CoinGecko or CoinMarketCap for a list of active markets.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="border border-white/10 bg-white/5 rounded-sm px-4">
          <AccordionTrigger className="font-mono text-left hover:text-primary hover:no-underline">
            What is Recycling and how does it affect the halving date?
          </AccordionTrigger>
          <AccordionContent className="font-mono text-muted-foreground leading-relaxed">
            Recycling occurs when TAO tokens are returned to the emission pool through subnet registration fees,
            deregistrations, and network operations. These recycled tokens are removed from circulating supply and
            returned to emissions. Since the halving is triggered by total token issuance (not block number), recycling
            delays the halving date by reducing the rate at which the supply milestone is reached.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7" className="border border-white/10 bg-white/5 rounded-sm px-4">
          <AccordionTrigger className="font-mono text-left hover:text-primary hover:no-underline">
            How often do halvings occur and do they stop after a certain number?
          </AccordionTrigger>
          <AccordionContent className="font-mono text-muted-foreground leading-relaxed">
            Bittensor halvings occur approximately every 4 years, similar to Bitcoin's halving schedule. The halvings
            continue indefinitely - they do not stop after the 5th or any other specific halving event. Each halving
            cuts the block reward in half, progressively slowing the emission rate as the network approaches its maximum
            supply of 21 million TAO.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
