exports = module.exports = PauseQueue;

function PauseQueue (worker, concurrency) {

	if (typeof concurrency === 'undefined') { concurrency = 1; }

	var pending = 0,
		queue = {
			tasks : [],
			concurrency : concurrency,
			drain : null,
			nothing : null,
			paused : false,

			push : function (task, priority, callback) {
				if (typeof priority === 'function') {
					callback = priority;
					priority = false;
				}

				queue.tasks.push({
					data : task,
					callback : (typeof callback === 'function') ? callback : null
				});

				process.nextTick(queue.run);
			},

			run : function () {
				if (!queue.paused && pending < queue.concurrency && queue.tasks.length) {
					var task = queue.tasks.shift();
					pending += 1;

					var next = function () {
						pending -= 1;

						if (task.callback) {
							task.callback.apply(task, arguments);
						}

						if (queue.drain && queue.tasks.length + pending === 0) { queue.drain(); }
						queue.run();
					};

					worker(task.data, next);
				}

				if (queue.nothing && queue.tasks.length + pending === 0) { queue.nothing(); }

			},

			pause : function () {
				queue.paused = true;
				queue.run();
			},

			resume : function () {
				queue.paused = false;
				queue.run();
			}, 

			length : function () {
				return queue.tasks.length;
			}
		};

	return queue;
}
