import { Section } from "@/components/ui/section";
import type { getLayout } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { ClassValue } from "tailwind-variants";
import PhoneIcon from "~icons/bi/phone";
import AddressIcon from "~icons/bi/pin-map";
import EmailIcon from "~icons/ph/at";
import FacebookIcon from "~icons/ph/facebook-logo-thin";
import InstagramIcon from "~icons/ph/instagram-logo-thin";
import YoutubeIcon from "~icons/ph/youtube-logo-thin";

// STYLES **********************************************************************************************************************************
const SOCIAL = "text-primary hover:text-primary-400";

// MAIN ************************************************************************************************************************************
export function TheFooter({ config: { city, email, facebook, instagram, phone, street, zipcode }, className }: TheFooterProps) {
  return (
    <Section border="top" intent="dark" className={cn("items-center text-white", className)}>
      <div className="container flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 p-3">
            <AddressIcon className="h-6 w-6 text-primary" />
            <span className="flex-auto">
              <div>{street}</div>
              <div>
                {zipcode} {city}
              </div>
            </span>
          </div>
          <a href={"mailto:" + email} className="group/email">
            <div className="flex items-center gap-4 p-3">
              <EmailIcon className="h-6 w-6 text-primary group-hover/email:text-primary-400" />
              <span className="flex-auto">
                <div>{email}</div>
              </span>
            </div>
          </a>
          <a href={"tel:" + phone} className="group/phone">
            <div className="flex items-center gap-4 p-3">
              <PhoneIcon className="h-6 w-6 text-primary group-hover/phone:text-primary-400" />
              <span className="flex-auto">
                <div>{phone}</div>
              </span>
            </div>
          </a>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex items-center justify-center gap-4">
            <a href={facebook} className={SOCIAL} aria-label="Facebook">
              <FacebookIcon className="h-12 w-12" />
            </a>
            <a href={instagram} className={SOCIAL} aria-label="Instagram">
              <InstagramIcon className="h-12 w-12" />
            </a>
            <a href="/" className={SOCIAL} aria-label="Youtube">
              <YoutubeIcon className="h-12 w-12" />
            </a>
          </div>
          <hr className="w-full border-dashed border-neutral-200" />
          <div className="flex flex-col items-end">
            <span>©2022 L'ENVOL - LA RÉUNION</span>
            <span className="text-sm">Tous droits réservés</span>
          </div>
          <a href="/articles/mentions-legales" className="self-end text-sm text-neutral-400 hover:text-white">
            mentions légales
          </a>
        </div>
      </div>
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
type Config = Awaited<ReturnType<typeof getLayout>>["config"];
export type TheFooterProps = { config: Config; className?: ClassValue };
