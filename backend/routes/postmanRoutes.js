const router = require("express").Router();
const bodyModel = require("../db/schemas/body");
const headerModel = require("../db/schemas/headers");
const paramsModel = require("../db/schemas/params");
const requestModel = require("../db/schemas/request");
const mongoose = require("mongoose");

router.get("/get", async (req, res) => {
  const id = req.query.id;
  if (id) {
    try {
      const request = await requestModel.findById(id);
      if (!request) {
        return res.json({ status: false, data: null, msg: "No request found" });
      }
      const headers = await Promise.allSettled([
        headerModel.findOne({ requestId: request._id }),
        paramsModel.findOne({ requestId: request._id }),
        bodyModel.findOne({ requestId: request._id }),
      ]);
      const correctHeaders = headers
        .filter((item) => {
          if (
            item.value?.headers !== undefined &&
            `${item.value.requestId}` === `${request._id}`
          ) {
            return true;
          }
          return false;
        })
        .map((item) => {
          return { headers: item.value._doc.headers };
        });
      const correctParams = headers
        .filter((item) => {
          if (
            item.value?.params !== undefined &&
            `${item.value.requestId}` === `${request._id}`
          ) {
            return true;
          }
          return false;
        })
        .map((item) => {
          return { params: item.value._doc.params };
        });
      const correctBody = headers
        .filter((item) => {
          if (
            item.value?.body !== undefined &&
            `${item.value.requestId}` === `${request._id}`
          ) {
            return true;
          }
          return false;
        })
        .map((item) => {
          return { body: item.value._doc.body };
        });

      return res.json({
        status: true,
        data: {
          headers: correctHeaders[0]?.headers || [],
          params: correctParams[0]?.params || [],
          body: correctBody[0]?.body || null,
          // body: JSON.parse(correctBody[0]?.body || null) || null,
          request: request._doc,
        },
      });
    } catch (error) {
      console.log("error...", error);
      return res.json({
        status: false,
        data: null,
      });
    }
  }
  try {
    const allRequests = await requestModel.find({});
    const headers = await Promise.allSettled([
      ...allRequests.map((request) => {
        return headerModel.findOne({ requestId: request._doc._id });
      }),
      ...allRequests.map((request) => {
        return paramsModel.findOne({ requestId: request._doc._id });
      }),
      ...allRequests.map((request) => {
        return bodyModel.findOne({ requestId: request._doc._id });
      }),
    ]);
    const finalResult = allRequests.map((request) => {
      const correctHeaders = headers
        .filter((item) => {
          if (
            item.value?.headers !== undefined &&
            `${item.value.requestId}` === `${request._doc._id}`
          ) {
            return true;
          }
          return false;
        })
        .map((item) => {
          return { headers: item.value._doc.headers };
        });
      const correctParams = headers
        .filter((item) => {
          if (
            item.value?.params !== undefined &&
            `${item.value.requestId}` === `${request._doc._id}`
          ) {
            return true;
          }
          return false;
        })
        .map((item) => {
          return { params: item.value._doc.params };
        });
      const correctBody = headers
        .filter((item) => {
          if (
            item.value?.body !== undefined &&
            `${item.value.requestId}` === `${request._doc._id}`
          ) {
            return true;
          }
          return false;
        })
        .map((item) => {
          return { body: item.value._doc.body };
        });

      return {
        ...request._doc,
        headers: correctHeaders[0]?.headers || [],
        params: correctParams[0]?.params || [],
        body: correctBody[0]?.body || null,
      };
    });
    return res.json({ status: true, data: finalResult });
  } catch (error) {
    console.log("error...", error);
    return res.json({
      status: false,
      data: { headers: null, request: null },
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const body = req.body;

    const session = await mongoose.startSession();
    const sessionResult = await session.withTransaction(
      async () => {
        console.log(
          JSON.stringify({
            title: body.title,
            description: body.description,
            url: body.url,
            method: body.method,
          })
        );
        const request = await requestModel.create(
          [
            {
              title: body.title,
              description: body.description,
              url: body.url,
              method: body.method,
            },
          ],
          { session }
        );
        if (!request[0]) {
          session.abortTransaction();
          return;
        }
        let finalData = [];
        if (body.headers.length > 0) {
          finalData.push(
            headerModel.create(
              [
                {
                  requestId: request[0]._id,
                  headers: body.headers,
                },
              ],
              { session }
            )
          );
        }
        if (body.params.length > 0) {
          finalData.push(
            paramsModel.create(
              [
                {
                  requestId: request[0]._id,
                  params: body.params,
                },
              ],
              { session }
            )
          );
        }
        if (body?.body?.length > 0) {
          finalData.push(
            bodyModel.create(
              [
                {
                  requestId: request[0]._id,
                  body: body.body,
                },
              ],
              { session }
            )
          );
        }

        // const addData = await Promise.allSettled([
        //   headerModel.create(
        //     {
        //       requestId: request._id,
        //       headers: body.headers,
        //     },
        //     { session }
        //   ),
        //   paramsModel.create(
        //     {
        //       requestId: request._id,
        //       params: body.params,
        //     },
        //     { session }
        //   ),
        //   bodyModel.create(
        //     {
        //       requestId: request._id,
        //       body: body.body,
        //     },
        //     { session }
        //   ),
        // ]);
        const addData = await Promise.allSettled(finalData);
        for (let index = 0; index < addData.length; index++) {
          const element = addData[index];
          console.log("element", JSON.stringify(element));
          if (element.status !== "fulfilled" || !element.value) {
            session.abortTransaction();
            return null;
          }
        }
        // const headers = await headerModel.create({
        //   requestId: request._id,
        //   headers: body.headers,
        // },{session});
        // const params = await paramsModel.create({
        //   requestId: request._id,
        //   params: body.params,
        // },{session});
        // const bodyRes = await bodyModel.create({
        //   requestId: request._id,
        //   body: body.params,
        // },{session});

        return {
          request: request[0],
          headers: addData?.[0]?.value || null,
          params: addData?.[1]?.value || null,
          body: addData?.[2]?.value?.[0] || null,
        };
      },
      { session }
    );

    await session.endSession();
    if (!sessionResult) {
      return res.json({
        status: false,
        data: null,
      });
    }
    return res.json({
      status: true,
      data: sessionResult,
    });
  } catch (error) {
    console.log("error...", error);
    return res.json({ status: false, error: error });
  }
});

router.post("/update", async (req, res) => {
  try {
    const body = req.body;
    const session = await mongoose.startSession();
    const sessionResult = await session.withTransaction(async () => {
      const request = await requestModel.findOneAndUpdate(
        { _id: body._id },
        {
          title: body.title,
          description: body.description,
          url: body.url,
          method: body.method,
        },
        { session }
      );
      const headers = await headerModel.findOneAndUpdate(
        { requestId: body._id },
        {
          headers: body.headers,
        },
        { session }
      );
      return { headers, request };
    });

    await session.endSession();
    return res.json({
      status: true,
      data: sessionResult,
    });
  } catch (error) {
    console.log("error...", error);
    return res.json({ status: false, error: error });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const body = req.query;
    const session = await mongoose.startSession();
    console.log("id ", body._id);
    console.log("body ", body);
    const sessionResult = await session.withTransaction(async () => {
      const request = await requestModel.deleteOne(
        {
          _id: body._id,
        },
        { session }
      );
      // console.log("request ", request);

      if (!request.acknowledged) {
        return session.abortTransaction();
      }

      const headers = await headerModel.deleteOne(
        {
          requestId: "65bc56ce0b5d1bfff2588834",
        },
        { session }
      );

      // console.log("headers ", headers);

      if (!headers.acknowledged) {
        return session.abortTransaction();
      }

      return { headers, request };
    });

    await session.endSession();
    // console.log("session result ", sessionResult);
    if (!sessionResult) {
      return res.json({
        status: false,
        data: null,
      });
    }
    return res.json({
      status: true,
      data: sessionResult,
    });
  } catch (error) {
    console.log("error...", error);
    return res.json({ status: false, error: error });
  }
});

module.exports = router;
