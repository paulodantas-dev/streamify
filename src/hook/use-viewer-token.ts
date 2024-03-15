import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

import { createViewerToken } from "@/actions/token";
import { useToast } from "@/components/ui/use-toast";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const name = decodedToken?.name;
        const identity = decodedToken.iss;

        if (name) {
          setName(name);
        }

        if (identity) {
          setIdentity(identity);
        }
      } catch {
        toast({
          variant: "destructive",
          description: "Failed to create viewer token",
        });
      }
    };

    createToken();
  }, [hostIdentity, toast]);

  console.log({
    token,
    name,
    identity,
  });

  return {
    token,
    name,
    identity,
  };
};
