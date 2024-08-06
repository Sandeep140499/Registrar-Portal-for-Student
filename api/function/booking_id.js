const generateBookingId = async function (model, namePrefix) {
  const paddingLength = 6;

  const lastBooking = await model.findOne(
    { bookingId: { $regex: `^${namePrefix}` } },
    { bookingId: 1 },
    { sort: { bookingId: -1 } }
  );

  let nextNumericalSuffix;

  if (lastBooking) {
    const lastNumericalSuffix = parseInt(
      lastBooking.bookingId.slice(-paddingLength),
      10
    );
    nextNumericalSuffix = (lastNumericalSuffix + 1)
      .toString()
      .padStart(paddingLength, "0");
  } else {
    nextNumericalSuffix = "000001";
  }

  return `${namePrefix}${nextNumericalSuffix}`;
};

module.exports = generateBookingId;
