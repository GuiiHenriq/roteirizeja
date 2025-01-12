import { GeneratedItinerary, ItineraryActivity, DayActivities } from "@/types/itinerary";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileDown } from "lucide-react";
import { useState, useRef, memo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import toPDF from 'react-to-pdf';
import { DayCard } from "./DayCard";
import { useVirtualizer } from '@tanstack/react-virtual';

interface ItineraryDisplayProps {
  itinerary: GeneratedItinerary;
  itineraryId: string;
}

const ItineraryDisplay = memo(({ itinerary, itineraryId }: ItineraryDisplayProps) => {
  const [localItinerary, setLocalItinerary] = useState(itinerary);
  const contentRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: localItinerary.itinerary.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300, // Estimated height of each day card
    overscan: 5, // Number of items to render outside of the visible area
  });

  const handleActivityUpdate = async (dayIndex: number, period: keyof DayActivities, updatedActivity: ItineraryActivity) => {
    const newItinerary = { ...localItinerary };
    newItinerary.itinerary[dayIndex].activities[period] = updatedActivity;
    
    try {
      const formattedItinerary = newItinerary.itinerary.map(day => ({
        day: day.day,
        activities: {
          morning: {
            Name: day.activities.morning.Name,
            Description: day.activities.morning.Description,
            Cost: day.activities.morning.Cost
          },
          afternoon: {
            Name: day.activities.afternoon.Name,
            Description: day.activities.afternoon.Description,
            Cost: day.activities.afternoon.Cost
          },
          evening: {
            Name: day.activities.evening.Name,
            Description: day.activities.evening.Description,
            Cost: day.activities.evening.Cost
          }
        }
      }));

      const { error } = await supabase
        .from('itineraries')
        .update({
          itinerary_data: {
            itinerary: formattedItinerary
          }
        })
        .eq('id', itineraryId);

      if (error) throw error;

      setLocalItinerary(newItinerary);
      toast.success('Atividade atualizada com sucesso!');
    } catch (error) {
      console.error('Error updating activity:', error);
      toast.error('Erro ao atualizar a atividade');
    }
  };

  const handleExportPDF = async () => {
    try {
      const options = {
        filename: `roteiro-${localItinerary.destination.toLowerCase()}.pdf`,
        page: {
          margin: 20,
          format: 'a4'
        }
      };

      if (contentRef.current) {
        await toPDF(() => contentRef.current!, options);
        toast.success('PDF exportado com sucesso!');
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Erro ao exportar o PDF');
    }
  };

  if (!localItinerary || !localItinerary.destination || !localItinerary.dates || !Array.isArray(localItinerary.itinerary)) {
    return (
      <div className="text-center text-muted-foreground">
        Dados do roteiro incompletos ou inválidos
      </div>
    );
  }

  const startDate = new Date(localItinerary.dates.start + 'T12:00:00');
  const endDate = new Date(localItinerary.dates.end + 'T12:00:00');

  return (
    <div className="space-y-8 mb-20 md:mb-0">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="text-center flex-1">
          <h2 className="text-2xl font-bold mb-2">{localItinerary.destination}</h2>
          <p className="text-muted-foreground">
            {format(startDate, "dd 'de' MMMM", { locale: ptBR })} -{" "}
            {format(endDate, "dd 'de' MMMM, yyyy", { locale: ptBR })}
          </p>
        </div>
        <Button
          onClick={handleExportPDF}
          className="flex items-center gap-2 w-full md:w-auto"
          variant="outline"
        >
          <FileDown className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>
      
      <div ref={contentRef}>
        <div 
          ref={parentRef} 
          className="grid gap-6"
          style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const day = localItinerary.itinerary[virtualItem.index];
            return (
              <div
                key={day.day}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <DayCard
                  date={day.day}
                  activities={day.activities}
                  onUpdateActivity={(period, activity) => 
                    handleActivityUpdate(virtualItem.index, period, activity)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

ItineraryDisplay.displayName = "ItineraryDisplay";

export default ItineraryDisplay;