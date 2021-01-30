const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const message = require("../utils/message");

const getDetails = asyncHandler((req, res, next) => {
  return res.status(200).json({
    message: "My Rule-Validation API",
    success: "success",
    data: {
      name: "Olayinka Famutimi",
      github: "@Smartyinkuse1",
      email: "olayinkafamutimi@gmail.com",
      mobile: "09026333527",
      twitter: "@smartyinkusee",
    },
  });
});

const validateRule = asyncHandler((req, res, next) => {
  const { rule, data } = req.body;
  const values = ["eq", "neq", "gt", "gte", "contains"];
  let field, condition, condition_value;
  if (!rule) {
    return next(new ErrorResponse(`rule is required`, 400, null));
  }
  if (!data) {
    return next(new ErrorResponse(`data is required`, 400, null));
  }
  console.log("Hello World");
  if (!(typeof data === ("object" || "array" || "string"))) {
    return next(new ErrorResponse(`Invalid JSON payload passed.`, 400, null));
  }
  if (!(typeof rule === "object" && rule !== null)) {
    return next(new ErrorResponse(`rule should be an object`, 400, null));
  } else {
    if (rule.hasOwnProperty("field")) {
      field = rule["field"];
      if (!(typeof field === "string" && field !== null)) {
        return next(
          new ErrorResponse(`Invalid JSON payload passed.`, 400, null)
        );
      }
    } else {
      return next(new ErrorResponse(`rule.field is required`, 400, null));
    }
    if (rule.hasOwnProperty("condition")) {
      condition = rule["condition"];
      if (!values.includes(condition)) {
        return next(
          new ErrorResponse(`Invalid JSON payload passed.`, 400, null)
        );
      }
    } else {
      return next(new ErrorResponse(`rule.condition is required`, 400, null));
    }
    if (rule.hasOwnProperty("condition_value")) {
      condition_value = rule["condition_value"];
    } else {
      return next(
        new ErrorResponse(`rule.condition_value is required`, 400, null)
      );
    }
  }
  let nestedField = field.split(".");
  console.log(nestedField);
  switch (condition) {
    case "eq":
      if (nestedField.length === 1) {
        if (data.hasOwnProperty(nestedField[0])) {
          let dataField = data[nestedField[0]];
          if (dataField == condition_value) {
            let validation = {
              error: false,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res.json(
              message(
                `field ${nestedField[0]} successfully validated`,
                "success",
                validation
              )
            );
          } else {
            let validation = {
              error: true,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res
              .status(400)
              .json(
                message(
                  `field ${nestedField[0]} failed validation`,
                  "error",
                  validation
                )
              );
          }
        } else {
          return next(
            new ErrorResponse(
              `field ${nestedField[0]} is missing from data`,
              400,
              null
            )
          );
        }
      } else if (nestedField.length === 2) {
        if (
          data.hasOwnProperty(nestedField[0])
        ) {
          let secondObj = data[nestedField[0]]
          if (secondObj.hasOwnProperty(nestedField[1])) {
            let dataField = secondObj[nestedField[0]];
            if (dataField == condition_value) {
              let validation = {
                error: false,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res.json(
                message(
                  `field ${nestedField[1]} successfully validated`,
                  "success",
                  validation
                )
              );
          }
          else {
            let validation = {
              error: true,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res
              .status(400)
              .json(
                message(
                  `field ${nestedField[1]} failed validation`,
                  "error",
                  validation
                )
              );
          }
          }
          else {
            return next(
              new ErrorResponse(
                `field ${nestedField[1]} is missing from data`,
                400,
                null
              )
            );
          }
           
        }
         
      }
      break;
    case "gt":
      if (nestedField.length === 1) {
        if (data.hasOwnProperty(nestedField[0])) {
          let dataField = data[nestedField[0]];
          if (dataField > condition_value) {
            let validation = {
              error: false,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res.json(
              message(
                `field ${nestedField[0]} successfully validated`,
                "success",
                validation
              )
            );
          } else {
            let validation = {
              error: true,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res
              .status(400)
              .json(
                message(
                  `field ${nestedField[0]} failed validation`,
                  "error",
                  validation
                )
              );
          }
        } else {
          return next(
            new ErrorResponse(
              `field ${nestedField[0]} is missing from data`,
              400,
              null
            )
          );
        }
      } else if (nestedField.length === 2) {
        if (
          data.hasOwnProperty(nestedField[0])
        ) {
          let secondObj = data[nestedField[0]]
          if (secondObj.hasOwnProperty(nestedField[1])) {
            let dataField = secondObj[nestedField[1]];
            if (dataField > condition_value) {
              let validation = {
                error: false,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res.json(
                message(
                  `field ${nestedField[1]} successfully validated`,
                  "success",
                  validation
                )
              );
          }
          else {
            let validation = {
              error: true,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res
              .status(400)
              .json(
                message(
                  `field ${nestedField[1]} failed validation`,
                  "error",
                  validation
                )
              );
          }
          }
          else {
            return next(
              new ErrorResponse(
                `field ${nestedField[1]} is missing from data`,
                400,
                null
              )
            );
          }
           
        }
         
      }
      break;

    case "gte":
      if (nestedField.length === 1) {
        if (data.hasOwnProperty(nestedField[0])) {
          let dataField = data[nestedField[0]];
          if (dataField >= condition_value) {
            let validation = {
              error: false,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res.json(
              message(
                `field ${nestedField[0]} successfully validated`,
                "success",
                validation
              )
            );
          } else {
            let validation = {
              error: true,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res
              .status(400)
              .json(
                message(
                  `field ${nestedField[0]} failed validation`,
                  "error",
                  validation
                )
              );
          }
        } else {
          return next(
            new ErrorResponse(
              `field ${nestedField[0]} is missing from data`,
              400,
              null
            )
          );
        }
      } else if (nestedField.length === 2) {
        if (
          data.hasOwnProperty(nestedField[0])
        ) {
          let secondObj = data[nestedField[0]]
          if (secondObj.hasOwnProperty(nestedField[1])) {
            let dataField = secondObj[nestedField[1]];
            if (dataField >= condition_value) {
              let validation = {
                error: false,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res.json(
                message(
                  `field ${nestedField[1]} successfully validated`,
                  "success",
                  validation
                )
              );
          }
          else {
            let validation = {
              error: true,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res
              .status(400)
              .json(
                message(
                  `field ${nestedField[1]} failed validation`,
                  "error",
                  validation
                )
              );
          }
          }
          else {
            return next(
              new ErrorResponse(
                `field ${nestedField[1]} is missing from data`,
                400,
                null
              )
            );
          }
           
        }
         
      }
      break;
      
      
    case "neq":
      if (nestedField.length === 1) {
        if (data.hasOwnProperty(nestedField[0])) {
          let dataField = data[nestedField[0]];
          console.log(dataField, condition_value);
          if (dataField != condition_value) {
            let validation = {
              error: false,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res.json(
              message(
                `field ${nestedField[0]} successfully validated`,
                "success",
                validation
              )
            );
          } else {
            let validation = {
              error: true,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res
              .status(400)
              .json(
                message(
                  `field ${nestedField[0]} failed validation`,
                  "error",
                  validation
                )
              );
          }
        } else {
          return next(
            new ErrorResponse(
              `field ${nestedField[0]} is missing from data`,
              400,
              null
            )
          );
        }
      } else if (nestedField.length === 2) {
        if (
          data.hasOwnProperty(nestedField[0])
        ) {
          let secondObj = data[nestedField[0]]
          if (secondObj.hasOwnProperty(nestedField[1])) {
            let dataField = secondObj[nestedField[1]];
            if (dataField != condition_value) {
              let validation = {
                error: false,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res.json(
                message(
                  `field ${nestedField[1]} successfully validated`,
                  "success",
                  validation
                )
              );
          }
          else {
            let validation = {
              error: true,
              field,
              field_value: dataField,
              condition,
              condition_value,
            };
            res
              .status(400)
              .json(
                message(
                  `field ${nestedField[1]} failed validation`,
                  "error",
                  validation
                )
              );
          }
          }
          else {
            return next(
              new ErrorResponse(
                `field ${nestedField[1]} is missing from data`,
                400,
                null
              )
            );
          }
           
        }
         
      }
      break;
      
    case "contains":
      if (nestedField.length === 1) {
        if (data.hasOwnProperty(nestedField[0])) {
          let dataField = data[nestedField[0]];
          console.log(dataField, condition_value, typeof dataField);
          if (Array.isArray(dataField) || typeof dataField == "string" ) {
            if (dataField.includes(condition_value)) {
              let validation = {
                error: false,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res.json(
                message(
                  `field ${nestedField[0]} successfully validated`,
                  "success",
                  validation
                )
              );
            } else {
              let validation = {
                error: true,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res
                .status(400)
                .json(
                  message(
                    `field ${nestedField[0]} failed validation`,
                    "error",
                    validation
                  )
                );
            }
            
            
          } else {
            if (dataField.hasOwnProperty(nestedField[0])) {
              let validation = {
                error: false,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res.json(
                message(
                  `field ${nestedField[0]} successfully validated`,
                  "success",
                  validation
                )
              );
            }
            else {
              let validation = {
                error: true,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res
                .status(400)
                .json(
                  message(
                    `field ${nestedField[0]} failed validation`,
                    "error",
                    validation
                  )
                );
            }
          }
        } else {
          return next(
            new ErrorResponse(
              `field ${nestedField[0]} is missing from data`,
              400,
              null
            )
          );
        }
      } else if (nestedField.length === 2) {
        if (
          data.hasOwnProperty(nestedField[0])
        ) {
          let secondObj = data[nestedField[0]]
          if (secondObj.hasOwnProperty(nestedField[1])) {
            let dataField = secondObj[nestedField[1]];
          console.log(dataField, condition_value, typeof dataField);
          if (Array.isArray(dataField) || typeof dataField == "string" ) {
            if (dataField.includes(condition_value)) {
              let validation = {
                error: false,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res.json(
                message(
                  `field ${nestedField[0]} successfully validated`,
                  "success",
                  validation
                )
              );
            } else {
              let validation = {
                error: true,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res
                .status(400)
                .json(
                  message(
                    `field ${nestedField[0]} failed validation`,
                    "error",
                    validation
                  )
                );
            }
            
            
          } else {
            if (dataField.hasOwnProperty(nestedField[0])) {
              let validation = {
                error: false,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res.json(
                message(
                  `field ${nestedField[0]} successfully validated`,
                  "success",
                  validation
                )
              );
            }
            else {
              let validation = {
                error: true,
                field,
                field_value: dataField,
                condition,
                condition_value,
              };
              res
                .status(400)
                .json(
                  message(
                    `field ${nestedField[0]} failed validation`,
                    "error",
                    validation
                  )
                );
            }
          }
          }
          else {
            return next(
              new ErrorResponse(
                `field ${nestedField[1]} is missing from data`,
                400,
                null
              )
            );
          }
           
        }
         
      }
      break;


      default:
      break;
  }
});

module.exports = { getDetails, validateRule };
