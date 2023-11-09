export default interface GovernanceProposalType {
  Title: string;
  Executed: boolean;
  Date: string;
  Quorum: boolean;
  Yae: number;
  Differential: boolean;
  Nay: number;
}
