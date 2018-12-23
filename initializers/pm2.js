import io from '@pm2/io';

export default () => {
  io.init({
    metrics: {
      eventLoopActive: true,
      eventLoopDelay: true,
      transaction: {
        http: true,
        tracing: {
          http_latency: 1,
        },
      },
      deepMetrics: true,
      v8: true,
    },
  });
};
