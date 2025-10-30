import db from "../../db/knex.js";

export const getVacations = async (req, res) => {
  try {
    const { status } = req.query;
    const allowedStatuses = ["Pending", "Approved", "Rejected"];

    let query = db("vacation_requests")
      .join("users", "vacation_requests.user_id", "users.id")
      .select(
        "vacation_requests.*",
        "users.name as user_name",
        "users.email as user_email"
      );

    if (status) {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          error: `Invalid status. Allowed: ${allowedStatuses.join(", ")}`,
        });
      }
      query = query.where("vacation_requests.status", status);
    }

    const requests = await query;
    res.json(requests || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVacationsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const requests = await db('vacation_requests')
      .where('user_id', id)
      .orderBy('created_at', 'desc');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

