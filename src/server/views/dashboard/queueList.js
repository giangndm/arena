const QueueHelpers = require('../helpers/queueHelpers');

async function handler(req, res) {
  const {Queues} = req.app.locals;
  const queues = Queues.list();
  const basePath = req.baseUrl;
  
  let details = await Promise.all(queues.map(async (queue) => {
      let queue_d = await Queues.get(queue.name, queue.hostId);
      let counts = await queue_d.getJobCounts();
      Object.assign(queue, counts);
      return counts;
  }));
  
  return res.render('dashboard/templates/queueList', { basePath, queues });
}

module.exports = handler;
