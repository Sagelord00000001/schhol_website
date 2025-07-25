-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('student', 'parent', 'staff', 'admin')) DEFAULT 'student',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructor TEXT NOT NULL,
  category TEXT NOT NULL,
  thumbnail_url TEXT,
  students_count INTEGER DEFAULT 0,
  duration TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Anyone can view published news" ON news
  FOR SELECT TO authenticated, anon USING (true);

-- Insert sample data
INSERT INTO courses (title, description, instructor, category, duration, students_count) VALUES
('Advanced Mathematics', 'Comprehensive mathematics curriculum from algebra to calculus', 'Dr. Sarah Johnson', 'STEM', '12 weeks', 45),
('Digital Science Lab', 'Interactive science experiments and digital simulations', 'Prof. Michael Chen', 'STEM', '10 weeks', 38),
('Creative Writing Workshop', 'Develop your writing skills through creative exercises', 'Ms. Emily Rodriguez', 'Arts', '8 weeks', 52),
('Computer Science Fundamentals', 'Learn programming and computational thinking', 'Dr. Alex Kim', 'STEM', '14 weeks', 41),
('World History Explorer', 'Journey through civilizations and historical events', 'Prof. David Thompson', 'Humanities', '12 weeks', 47),
('Digital Art & Design', 'Create stunning digital artwork and designs', 'Ms. Lisa Park', 'Arts', '10 weeks', 35);

INSERT INTO news (title, excerpt, content, category, author) VALUES
('Westfield Academy Wins State Science Championship', 'Our students have achieved remarkable success at the state-level science competition, bringing home the championship trophy for the third consecutive year.', 'In an outstanding display of scientific excellence, Westfield Academy students dominated the state science championship...', 'Achievement', 'Dr. Margaret Wilson'),
('New STEM Lab Opens to Students', 'State-of-the-art laboratory facility enhances hands-on learning opportunities for all grade levels.', 'The new STEM laboratory represents a significant investment in our students'' future...', 'Facilities', 'James Mitchell'),
('Spring Arts Festival Showcase', 'Students display their creative talents in our annual arts festival featuring music, drama, and visual arts.', 'This year''s Spring Arts Festival was a spectacular celebration of creativity...', 'Events', 'Ms. Emily Rodriguez'),
('Community Service Initiative Launch', 'New program connects students with local organizations for meaningful community engagement.', 'We are proud to announce the launch of our comprehensive community service program...', 'Community', 'Robert Davis'),
('Athletic Teams Excel in Regional Competition', 'Multiple sports teams advance to state championships following outstanding regional performances.', 'Our athletic programs continue to demonstrate excellence both on and off the field...', 'Sports', 'Coach Sarah Williams'),
('Technology Integration Success Story', 'How our 1:1 device program has transformed learning experiences across all subject areas.', 'The implementation of our technology integration program has yielded remarkable results...', 'Technology', 'Dr. Lisa Chen');
