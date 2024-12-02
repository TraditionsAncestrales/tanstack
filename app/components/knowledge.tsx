import type { Testimony } from "@/lib/pocketbase";
import type { EventItem, Image, PostItem, ServiceItem } from "@/lib/pocketbase/utils";
import { PostsItem } from "./posts-item";
import { RecordsItems } from "./records-items";
import { TheTestimonies } from "./the-testimonies";

// MAIN ************************************************************************************************************************************
export function Knowledge(props: KnowledgeProps) {
  const { consultations = [], events, post, testimonies = [], testimoniesImage, trainings = [], workshops = [] } = props;
  const count = +(consultations.length > 0) + +(workshops.length > 0) + +(trainings.length > 0);
  const eventIntent = count > 0 ? "primary" : "light";
  return (
    <>
      <PostsItem post={post} border="top" />
      <RecordsItems title="Consultation" items={consultations} intent={count > 1 ? "primary" : "light"} />
      <RecordsItems title="Atelier" items={workshops} intent="light" />
      <RecordsItems title="Formation" items={trainings} intent={count === 3 ? "white" : "light"} />
      <RecordsItems title="Événement" items={events} border="bottom" intent={eventIntent} forceMultiple removeStale externalLink>
        <div>
          <p>Retrouvez bientôt ici l'ensemble de mes événements.</p>
          <strong>Vous pouvez déjà en obtenir le programme en me faisant une demande via le formulaire de contact.</strong>
        </div>
      </RecordsItems>
      <TheTestimonies items={testimonies} image={testimoniesImage} />
    </>
  );
}

// TYPES ***********************************************************************************************************************************
export type KnowledgeProps = {
  consultations?: ServiceItem[];
  events: EventItem[];
  post: PostItem;
  testimonies?: Testimony[];
  testimoniesImage?: Image;
  trainings?: ServiceItem[];
  workshops?: ServiceItem[];
};
