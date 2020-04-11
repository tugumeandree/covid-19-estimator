
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
  
    const IpctCurrentlyInfected = data.reportedCases * 10;
    const IpctInfectionsByRequestedTime = Math.trunc(IpctCurrentlyInfected * (2 ** (days / 3)));
  
  
    const SvrIpctCurrentlyInfected = data.reportedCases * 50;
    const SvrIpctInfectionsByRequestedTime = Math.trunc(SvrIpctCurrentlyInfected * (2 ** (days / 3)));
  
  
    const bestCaseEstimation = {
      currentlyInfected: IpctCurrentlyInfected,
      infectionsByRequestedTime: IpctInfectionsByRequestedTime,
    };
    const severeCaseEstimation = {
      currentlyInfected: SvrIpctCurrentlyInfected,
      infectionsByRequestedTime: SvrIpctInfectionsByRequestedTime,
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
  