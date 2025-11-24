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
      term: "Alpha",
      def: "A dynamic parameter in Bittensor's consensus mechanism (liquid alpha) that adjusts based on validator consensus. It influences the exponential moving average of bonds between validators and miners, affecting dividend calculations and fostering early discovery of high-performing miners.",
    },
    {
      term: "Alpha Tokens",
      def: "Subnet-specific tokens earned by validators for their participation in subnet consensus. Alpha emissions follow the same halving schedule as TAO. Validators' stake weight is calculated as their alpha stake plus TAO stake multiplied by 0.18 (tao_weight parameter).",
    },
    {
      term: "Subnets",
      def: "Independent specialized networks within Bittensor, each focused on specific AI tasks (text, images, data scraping, etc.). Subnet owners register their subnet and miners/validators compete within it.",
    },
    {
      term: "Miner",
      def: "A network participant that produces AI models, predictions, or other valuable outputs. Miners are evaluated by validators who submit performance scores (weights) to the blockchain. These scores determine each miner's share of subnet emissions.",
    },
    {
      term: "Validator",
      def: "A network participant that evaluates miners' outputs and assigns performance scores. To qualify, validators must be in the top 64 nodes by emissions with a stake weight of at least 1000. They earn dividends from their alpha stake and TAO stake.",
    },
    {
      term: "Stake",
      def: "TAO tokens locked by a Validator to vouch for the quality of Miners. Higher stake gives a Validator more weight in the consensus mechanism.",
    },
    {
      term: "UID",
      def: "Unique Identifier assigned to each neuron (miner or validator) within a subnet. UIDs are limited per subnet and must be registered to participate.",
    },
    {
      term: "Metagraph",
      def: "A core data structure providing a complete overview of a subnet's state at any block. Includes information about participating neurons, emissions, bonds, trust (VTrust), consensus scores, incentives, and dividends. Accessible via CLI, Python SDK, smart contracts, or RPC functions.",
    },
    {
      term: "Emission",
      def: "The creation of new TAO tokens. Currently 1 TAO per block (every ~12 seconds). After the first halving, this rate will drop to 0.5 TAO per block. With Dynamic TAO (DTAO), both TAO and Alpha tokens follow the same halving schedule.",
    },
    {
      term: "Root Network",
      def: "Subnet 0. It is responsible for determining the emission distribution across all other subnets based on their performance.",
    },
    {
      term: "Incentive Mechanism",
      def: "The protocol that determines how TAO rewards are distributed to miners and validators based on their contributions and stake. Each subnet can implement custom incentive mechanisms.",
    },
    {
      term: "Recycling",
      def: "The process where TAO tokens are returned to the emission pool through subnet registration fees, deregistrations, and network operations. Recycled tokens reduce circulating supply, delaying the halving date since halvings are triggered by total issuance, not block number.",
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
