import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Section, type SectionProps } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import { Title } from "@/components/ui/title";
import type { ContactValues } from "@/lib/utils";
// import { getContactMessage, rhfErrorsFromAstro, zContactValues, type ContactState, type ContactValues, type Message } from "@/lib/utils";
import { type PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { tv } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
const FORM = tv({ base: "flex flex-col gap-4" });

// MAIN ************************************************************************************************************************************
export function TheContact({ children, className, ...rest }: TheContactProps) {
  // const [state, action, isPending] = useActionState(experimental_withState<ContactState | undefined>(actions.sendMessage), initState);
  const center: [number, number] = [-21.142_107, 55.294_209];
  // const message = useMemo(() => getContactMessage(state, isPending), [state, isPending]);

  const form = useForm<ContactValues>({
    mode: "onTouched",
    // resolver: zodResolver(zContactValues),
    // defaultValues: initValues,
    // errors: useMemo(() => rhfErrorsFromAstro(state?.error), [state]),
  });
  const { control, formState, handleSubmit, reset } = form;

  // useEffect(() => {
  //   if (message) {
  //     const { description, code } = message ?? {};
  //     if (code === "SUCCESS") {
  //       reset();
  //       toast.success("Succès", { description });
  //     } else toast.error("Erreur", { description });
  //   }
  // }, [message, reset]);

  return (
    <Section className="relative" {...rest} header={<Title text="Me contacter" className="mb-8" />}>
      <div className="flex w-full justify-center gap-8 xl:justify-start">
        <Form {...form}>
          <form
            // action={action}
            onSubmit={formState.isValid ? undefined : handleSubmit(() => true)}
            className={FORM({ className: "w-full max-w-xl pb-96 xl:pb-0" })}
          >
            {/* {initMessage && (
              <Alert variant={initMessage.code === "SUCCESS" ? "default" : "destructive"}>
                <AlertTitle>{initMessage.code === "SUCCESS" ? "Succès" : "Erreur"}</AlertTitle>
                <AlertDescription>{initMessage.description}</AlertDescription>
              </Alert>
            )} */}
            <FormField
              control={control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre nom</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre courriel</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre message</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="flex gap-2 self-end">
              Envoyer
            </Button>
          </form>
        </Form>
        {children}
      </div>
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheContactProps = SectionProps &
  PropsWithChildren<{
    className?: string;
  }>;
