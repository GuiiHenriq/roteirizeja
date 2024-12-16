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
    <div className="space-y-3">
      <Label className="text-base">Interesses</Label>
      <div className="grid grid-cols-2 gap-4">
        {interests.map((interest) => (
          <div 
            key={interest} 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <Checkbox
              id={interest}
              checked={selectedInterests.includes(interest)}
              onCheckedChange={() => toggleInterest(interest)}
              className="h-5 w-5"
            />
            <label
              htmlFor={interest}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
            >
              {interest}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};