
import cron from 'node-cron';

const setCronJob = ( schedule: string, runFunction: () => void, stopAfterExecution = true ) => {
    const cronJob = cron.schedule(schedule, () => {
        runFunction();
        if (stopAfterExecution) cronJob.stop();
        
    });

    cronJob.start();
};

export default setCronJob;

