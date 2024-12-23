const calculateReadingTime = (body) => {
    const wordsPerMinute = 200;
    const wordCount = body.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };
  
  module.exports = calculateReadingTime;
  