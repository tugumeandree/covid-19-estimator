/* eslint-disable */
const covid19ImpactEstimator = (data) => {
    data = { // eslint-disable-line no-param-reassign
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71,
      },
      periodType: 'days',
      timeToElapse: 58,
      reportedCases: 674,
      population: 66622705,
      totalHospitalBeds: 1380614,
    };
  
    const normalisedDuration = (timeToElapse, periodType) => {
      switch (periodType) {
        case 'weeks':
          return timeToElapse * 7;
        case 'months':
          return timeToElapse * 30;
        default:
          return timeToElapse;
      }
    };
    const days = normalisedDuration(data.timeToElapse, data.periodType);
    const avbBeds = Math.trunc(data.totalHospitalBeds * 0.35);
  
    const IpctCurrentlyInfected = data.reportedCases * 10;
    const IpctInfectionsByRequestedTime = Math.trunc(IpctCurrentlyInfected * (2 ** (days / 3)));
    const IpctSvrCasesByRequestedTime = Math.trunc(0.15 * IpctInfectionsByRequestedTime);
    const IpctHospitalBedsByRequestedTime = Math.trunc(IpctSvrCasesByRequestedTime - avbBeds);
    const IpctCasesForICUByRequestedTime = 0.05 * IpctInfectionsByRequestedTime;
    const IpctCasesForVentilatorsByRequestedTime = 0.02 * IpctInfectionsByRequestedTime;
    const IpctDollarsInFlight = IpctInfectionsByRequestedTime * data.region.avgDailyIncomeInUSD * days;// eslint-disable-line max-len
  
    const SvrIpctCurrentlyInfected = data.reportedCases * 50;
    const SvrIpctInfectionsByRequestedTime = Math.trunc(SvrIpctCurrentlyInfected * (2 ** (days / 3)));
    const SvrIpctSvrCasesByRequestedTime = Math.trunc(0.15 * SvrIpctInfectionsByRequestedTime);
    const SvrIpctHospitalBedsByRequestedTime = Math.trunc(SvrIpctSvrCasesByRequestedTime - avbBeds);
    const SvrIpctCasesForICUByRequestedTime = 0.05 * SvrIpctInfectionsByRequestedTime;
    const SvrIpctCasesForVentilatorsByRequestedTime = 0.02 * SvrIpctInfectionsByRequestedTime;
    const SvrIpctDollarsInFlight = SvrIpctInfectionsByRequestedTime * data.region.avgDailyIncomeInUSD * days;// eslint-disable-line max-len
  
    const bestCaseEstimation = {
      currentlyInfected: IpctCurrentlyInfected,
      infectionsByRequestedTime: IpctInfectionsByRequestedTime,
      severeCasesByRequestedTime: IpctSvrCasesByRequestedTime,
      hospitalBedsByRequestedTime: IpctHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: IpctCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: IpctCasesForVentilatorsByRequestedTime,
      dollarsInFlight: IpctDollarsInFlight,
    };
    const severeCaseEstimation = {
      currentlyInfected: SvrIpctCurrentlyInfected,
      infectionsByRequestedTime: SvrIpctInfectionsByRequestedTime,
      severeCasesByRequestedTime: SvrIpctSvrCasesByRequestedTime,
      hospitalBedsByRequestedTime: SvrIpctHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: SvrIpctCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: SvrIpctCasesForVentilatorsByRequestedTime,
      dollarsInFlight: SvrIpctDollarsInFlight,
    };
    return {
      data,
      estimate: {
        impact: bestCaseEstimation,
        severeImpact: severeCaseEstimation,
      },
    };
  };
  export default covid19ImpactEstimator;
  