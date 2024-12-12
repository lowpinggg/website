create type "public"."event_type" as enum ('tft', 'summoner');

create table "public"."event_registrations" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "name" text not null,
    "email" text not null,
    "discord" text not null,
    "riot_id" text not null,
    "rank" text not null,
    "event_id" text not null,
    "payment_id" text not null
);


create table "public"."events" (
    "id" text not null,
    "name" text not null,
    "date" date not null,
    "price" integer not null,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "type" event_type not null default 'tft'::event_type,
    "game" text,
    "poster_url" text default ''::text
);


CREATE UNIQUE INDEX event_registrations_pkey ON public.event_registrations USING btree (id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

alter table "public"."event_registrations" add constraint "event_registrations_pkey" PRIMARY KEY using index "event_registrations_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."event_registrations" add constraint "fk_event" FOREIGN KEY (event_id) REFERENCES events(id) not valid;

alter table "public"."event_registrations" validate constraint "fk_event";

grant delete on table "public"."event_registrations" to "anon";

grant insert on table "public"."event_registrations" to "anon";

grant references on table "public"."event_registrations" to "anon";

grant select on table "public"."event_registrations" to "anon";

grant trigger on table "public"."event_registrations" to "anon";

grant truncate on table "public"."event_registrations" to "anon";

grant update on table "public"."event_registrations" to "anon";

grant delete on table "public"."event_registrations" to "authenticated";

grant insert on table "public"."event_registrations" to "authenticated";

grant references on table "public"."event_registrations" to "authenticated";

grant select on table "public"."event_registrations" to "authenticated";

grant trigger on table "public"."event_registrations" to "authenticated";

grant truncate on table "public"."event_registrations" to "authenticated";

grant update on table "public"."event_registrations" to "authenticated";

grant delete on table "public"."event_registrations" to "service_role";

grant insert on table "public"."event_registrations" to "service_role";

grant references on table "public"."event_registrations" to "service_role";

grant select on table "public"."event_registrations" to "service_role";

grant trigger on table "public"."event_registrations" to "service_role";

grant truncate on table "public"."event_registrations" to "service_role";

grant update on table "public"."event_registrations" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";


