

module.exports.getBy_withpage = async (Model, search,pages) => {
    let page = (pages*10)-10
    try {
      const data  = await Model.find(search).limit(10).skip(page);
      if (!data )  return [false,"Incorrect details"]
      return [true,data]
     
    } catch (error) {
        return [false,error.message]
    }
};



// module.exports.getAll_withpage = async (Model,pages) => {
//     let page = (pages*10)-10
//     try {
//       const data  = await Model.find().limit(10).skip(page);
//       if (!data )  return [false,"Incorrect details"]
//       return [true,data]
     
//     } catch (error) {
//         return [false,error.message]
//     }
// };



module.exports.getBy = async (Model, search) => {
    try {
      const data  = await Model.find(search)
      if (!data )  return [false,"Incorrect details"]
      return [true,data]
     
    } catch (error) {
        return [false,error.message]
    }
};

module.exports.getByOne = async (Model, search) => {
    try {
      const data  = await Model.findOne(search)
      if (!data )  return [false,"Incorrect details"]
      return [true,data]
     
    } catch (error) {
        return [false,error.message]
    }
};



module.exports.getAll = async (Model) => {
    try {
      const data  = await Model.find()
      if (!data )  return [false,"Incorrect details"]
      return [true,data]
     
    } catch (error) {
        return [false,error.message]
    }
};



module.exports.postdata = async (Model,body) => {
    try {
      const data  = await Model.create(body)
      if (!data )  return [false,"Incorrect details"]
      return [true,data]
     
    } catch (error) {
        return [false,error.message]
    }
};

module.exports.Patchdata = async (Model,search,body) => {
    try {
      const data  = await Model.findOneAndUpdate(search,body)
      if (!data )  return [false,"Incorrect details"]
      return [true,data]
     
    } catch (error) {
        return [false,error.message]
    }
};


module.exports.Deletedata = async (Model,search) => {
    try {
      const data  = await Model.findOneAndDelete(search)
      if (!data )  return [false," details Successfully"]
      return [true,data]
     
    } catch (error) {
        return [false,error.message]
    }

};

// module.exports.Patchdata = async (Model, search, body) => {
//   try {
//     const data = await Model.findOneAndUpdate(search, body)
//     if (!data) return [false, "Incorrect details"]
//     return [true, data]

//   } catch (error) {
//     return [false, error.message]
//   }
// };


