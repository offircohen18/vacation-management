/**
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  await knex('vacation_requests').del();
  await knex('users').del();

  const users = [
    { name: 'Ophir Levi', email: 'ophir.levi@example.com', role: 'Requester' },
    { name: 'Maya Cohen', email: 'maya.cohen@example.com', role: 'Requester' },
    { name: 'Noam Ben', email: 'noam.ben@example.com', role: 'Requester' },
    { name: 'Eli Supervisor', email: 'eli.supervisor@example.com', role: 'Validator' },
  ];

  const insertedUsers = await knex('users').insert(users).returning(['id', 'name', 'email', 'role']);

  const vacationRequests = [
    {
      user_id: insertedUsers[0].id,
      start_date: '2025-11-10',
      end_date: '2025-11-14',
      reason: 'Family vacation',
      status: 'Pending',
      comments: null,
    },
    {
      user_id: insertedUsers[1].id,
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      reason: 'Business trip + vacation',
      status: 'Approved',
      comments: 'Approved by Eli - enjoy!',
    },
    {
      user_id: insertedUsers[2].id,
      start_date: '2025-10-30',
      end_date: '2025-11-02',
      reason: 'Family event',
      status: 'Rejected',
      comments: 'Too many people off those dates, please reschedule',
    },
    {
      user_id: insertedUsers[0].id,
      start_date: '2026-01-15',
      end_date: '2026-01-20',
      reason: 'Ski vacation',
      status: 'Pending',
      comments: null,
    },
    {
      user_id: insertedUsers[1].id,
      start_date: '2025-11-20',
      end_date: '2025-11-22',
      reason: null,
      status: 'Pending',
      comments: null,
    },
  ];

  await knex('vacation_requests').insert(vacationRequests);
}
