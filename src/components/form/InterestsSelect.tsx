import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface InterestsSelectProps {
  selectedInterests: string[];
  toggleInterest: (interest: string) => void;
}

const interests = [
  "Museus",
  "Gastronomia",
  "Praias",
  "Natureza",
  "História",
  "Compras",
  "Vida Noturna",
  "Aventura",
];

export const InterestsSelect = ({ selectedInterests, toggleInterest }: InterestsSelectProps) => {
  return (
    <div className="space-y-2">
      <Label>Interesses</Label>
      <div className="grid grid-cols-2 gap-4">
        {interests.map((interest) => (
          <div key={interest} className="flex items-center space-x-2">
            <Checkbox
              id={interest}
              checked={selectedInterests.includes(interest)}
              onCheckedChange={() => toggleInterest(interest)}
            />
            <label
              htmlFor={interest}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {interest}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};