create table submissions (
  id uuid primary key default gen_random_uuid(),
  circle text not null,
  priority_1 text not null,
  priority_2 text not null,
  priority_3 text not null,
  created_at timestamp default now()
);

create table priorities (
  id uuid primary key default gen_random_uuid(),
  circle text not null,
  text text not null,
  votes integer default 1,
  created_at timestamp default now(),
  unique(circle, text)
);