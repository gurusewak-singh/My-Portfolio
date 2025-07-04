import mcache from 'memory-cache';

const cache = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = mcache.get(key);
    
    if (cachedBody) {
      // Data is in the cache, send it straight away
      res.send(JSON.parse(cachedBody));
      return;
    } else {
      // Data is not in the cache, proceed to the controller
      res.sendResponse = res.send;
      res.send = (body) => {
        // When the controller sends a response, cache it first
        mcache.put(key, body, duration * 1000); // duration is in seconds
        res.sendResponse(body);
      };
      next();
    }
  };
};

// We also need a way to clear the cache when we add, update, or delete a project.
export const clearCache = (req, res, next) => {
    mcache.clear();
    console.log('Cache cleared!');
    next();
};


export default cache;