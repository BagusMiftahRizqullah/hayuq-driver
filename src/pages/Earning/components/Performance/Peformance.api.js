import CONFIG from '@config';

const apiGetPeformanceRules = () => {
  return `${CONFIG.portPerfomance}/reward/rules`;
};

export default {
  apiGetPeformanceRules,
};
