export default (schema) =>
  async (req, res, next) => {
      if (schema.body) 
        req.body = await schema.body.validateAsync(req.body);

      if (schema.query) {
        req.query = await schema.query.validateAsync(req.query);
      }  

      if (schema.params) 
        req.params = await schema.params.validateAsync(req.params);
      
      next();
}