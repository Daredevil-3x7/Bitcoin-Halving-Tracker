export function GlossarySection() {
  const terms = [
    {
      term: "Axon",
      def: "The server side of a Bittensor node. It receives requests from other nodes (Dendrites) and serves data or processing power.",
    },
    {
      term: "Dendrite",
      def: "The client side of a Bittensor node. It sends requests to Axons on the network to query information or scores.",
    },
    {
      term: "Neuron",
      def: "A node in the Bittensor network. It can act as a Miner (producing value) or a Validator (evaluating value).",
    },
    {
      term: "Stake",
      def: "TAO tokens locked by a Validator to vouch for the quality of Miners. Higher stake gives a Validator more weight in the consensus mechanism.",
    },
    {
      term: "Emission",
      def: "The creation of new TAO tokens. Currently 1 TAO per block (every ~12 seconds). This will halve to 0.5 TAO after the first halving.",
    },
    {
      term: "Root Network",
      def: "Subnet 0. It is responsible for determining the emission distribution across all other subnets based on their performance.",
    },
    {
      term: "Recycling",
      def: "The process where TAO tokens are returned to the emission pool through subnet registration fees, deregistrations, and network operations. Recycled tokens are removed from circulating supply, delaying the halving date.",
    },
    {
      term: "Halving",
      def: "A programmed reduction of block rewards by 50%, occurring approximately every 4 years. Halvings continue indefinitely, progressively reducing new TAO emission until the 21M cap is reached.",
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto py-12" id="glossary">
      <h2 className="text-2xl md:text-3xl font-mono font-bold mb-8 text-center tracking-tight">NETWORK GLOSSARY</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {terms.map((item, i) => (
          <div key={i} className="bg-card/30 border border-white/10 p-6 rounded-sm backdrop-blur-sm">
            <h3 className="text-primary font-mono font-bold text-lg mb-2">{item.term}</h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">{item.def}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
