export interface LTVCalculationRes {
  securityName?: string;
  isin?: string;
  ticker?: string;
  exchange?: string;
  securityType: string;
  status?: string;
  marketData?: MarketData;
  bondDetail?: BondDetail;
  ltvCalculation?: LtvCalculation;
}
interface LtvCalculation {
  ltvAtIm: number;
  ltvAtMc: number;
  ltvAtSl: number;
  override: Override;
  financingEligibility: FinancingEligibility;
  issueRating: string;
  issuerRating: string;
  ratingUsed: string;
  indicativeLtv1AdjMade: string[];
  indicativeLtv2AdjMade: string[];
  ltvCaps: LtvCaps;
  bondType: string;
  bondGrade: string;
  countryClassification: string;
  issueSizeUsd: number;
  spread: number;
}
interface LtvCaps {
  isCapApplied: boolean;
  reason: string;
}
interface FinancingEligibility {
  isEligible: boolean;
  reason: string;
}
interface Override {
  ltvAtIm: number;
  ltvAtMc: number;
  ltvAtSl: number;
  reason: string;
}
interface BondDetail {
  cdo: string;
  securityId: string;
  cusip: string;
  totoro: string;
  pdpId: string;
  maturityDate: string;
  issuerId: string;
  sectype: string;
  rule144aFlag: string;
  privatePlacementFlag: string;
  amountIssue: number;
  marketSectorDes: string;
  issuerName: string;
  lossAbsorption: string;
  mtyTyp: string;
  cpnTyp: string;
  isSubordinated: boolean;
  capContSec: string;
  isDepositCert: boolean;
  realIssuerId: string;
  ultParentCountryOfRisk: string;
  assetTypeId: string;
  assetTypeCode: string;
  maturityType: string;
  couponDividentType: string;
  capitalContingentSecurity: boolean;
  countryOfRisk: string;
  industrySectorCode: string;
  industryGroupCode: string;
  securityIdMap: string[];
  ultParentTickerExchange: string;
  issuerRatingSp: string;
  issuerRatingMoody: string[];
  securityRating: string[];
  guarantor: BaseSecurityDetails;
  ultimateIssuerParent: BaseSecurityDetails;
  issueParent: BaseSecurityDetails;
  issueRating: IssueRating;
}
interface MarketData {
  exchangeRate: string;
  yasIspreadToGovt: string;
  discMrgnAsk: string;
  calledDt: string;
  currency: string;
  pxLast: number;
  marketCloseDate: string;
}
interface IssueRating {
  rtgSp: string;
  rtgMoody: string;
  calledDt: string;
}
interface BaseRating {
  rtgSpIssuerCredit: string;
  rtgMdyLtFcDebitRating: string;
  rtgMoodyLongTerm: string;
}

interface BaseSecurityDetails {
  rating: BaseRating;
  ticker: string;
  exchange: string;
}
