const express = require("express");
const inventoryController = require("./../controllers/inventoryController");

const router = express.Router();

router.get("/showUserProducts", inventoryController.showUserProducts);
router.post("/reserveRequest", inventoryController.reserveRequest);
router.post("/showRequestToSecy", inventoryController.showRequestToSecy);
router.post("/showRequestToManager", inventoryController.showRequestToManager);
router.post(
  "/requestApprovedByManager",
  inventoryController.requestApprovedByManager
);
router.post(
  "/requestApprovedBySecy",
  inventoryController.requestApprovedBySecy
);
router.post(
  "/requestRejectedByManager",
  inventoryController.requestRejectedByManager
);
router.post(
  "/requestRejectedBySecy",
  inventoryController.requestRejectedBySecy
);
router.post("/takenIssuedProduct", inventoryController.takenIssuedProduct);
router.post("/returnedProduct", inventoryController.returnedProduct);

module.exports = router;
