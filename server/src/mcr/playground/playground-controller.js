import { Router } from 'express'
const HMAC_SHA1 = require('ims-lti/src/hmac-sha1')

const debug = false

export default class PlaygroundController {



  /**
   * @method _makeSignature
   * @param {*} req request
   * @param {*} res response
   * @description Responsible for generating the LTI body data for testing
   * the LTI request flow on Postman. It basically creates the nonce and timestamp
   * from the given req.body.req.data and then signs it, returning the signed body data.
   * 
   * @requires AdminToken an admin-authenticated token
   * @requires localhostConnection only localhost connections are allowed
   */
  _makeSignature (req, res) {
    if(req.body) {
      if(debug) console.log('req.body >>', req.body)
      try {
        let signer = new HMAC_SHA1()
        const mergedBody = Object.assign({}, req.body.req.data.ltiData, { 
          oauth_timestamp: Math.round(Date.now() / 1000),
          oauth_nonce: Date.now() + Math.random() * 100
        })
        const oauth_signature = signer.build_signature(
          req, 
          mergedBody,
          mergedBody.oauth_consumer_secret
        )

        const body = Object.assign({}, mergedBody, { oauth_signature })
        res.status(200).json({ body })
      }
      catch (err) {
        res.status(500).send(err)
      }
    }
  }

  
  route () {
    const router = new Router()

    router.post('/make-HMAC_SHA1' ,(req, res) => {
      console.log('this._makeSignature >> ', this._makeSignature)
      return this._makeSignature(req, res)
    })

    return router
  }

}